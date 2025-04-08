import React, { useState, useEffect } from 'react';
import { Save, Undo, Redo } from 'lucide-react';
import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar';
import { KEYPOINT_NAMES } from './types';
import DataForm from './components/DataForm';

function App() {
  const [keypoints, setKeypoints] = useState(
    KEYPOINT_NAMES.map((_, index) => ({
      id: index,
      name: KEYPOINT_NAMES[index],
      x: 0,
      y: 0,
      status: 0,
    }))
  );
  const [selectedKeypoint, setSelectedKeypoint] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (newKeypoints, newSelectedKeypoint) => {
    const newHistory = [...history.slice(0, historyIndex + 1), { keypoints: newKeypoints, selectedKeypoint: newSelectedKeypoint }];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Add the missing undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setKeypoints(prevState.keypoints);
      setSelectedKeypoint(prevState.selectedKeypoint);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Add the missing redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setKeypoints(nextState.keypoints);
      setSelectedKeypoint(nextState.selectedKeypoint);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleSave = async () => {
    const data = {
      imageId: '1', // Replace with actual image ID
      imageDimensions: {
        width: 512,
        height: 384,
      },
      keypoints: keypoints.map((kp) => ({
        name: kp.name,
        coordinates: [kp.x, kp.y],
        status: kp.status === 2 ? 'visible' : kp.status === 1 ? 'occluded' : 'unmarked',
      })),
    };

    try {
      console.log('Sending data to backend:', data);
      const response = await fetch('http://localhost:5000/save/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data: ${response.status} ${response.statusText}`);
      }

      console.log('Data sent to backend successfully');
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Failed to save data: ${error.message}`);
    }
  };

  const handleNext = async () => {
    try {
      console.log('Fetching next image from backend...');
      
      // Try to fetch from backend
      let response = await fetch('http://localhost:5000/load_next/');
      
      // If backend request fails, use a placeholder image
      if (!response.ok) {
        console.warn(`Backend request failed: ${response.status} ${response.statusText}`);
        console.log('Using placeholder image instead');
        
        // Placeholder image URL (you can replace with any placeholder image)
        const placeholderUrl = 'https://placehold.co/512x384/gray/white?text=No+Image+Available';
        
        // Create a new response with the placeholder
        response = await fetch(placeholderUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to load placeholder image: ${response.status} ${response.statusText}`);
        }
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      console.log('Image loaded, setting URL:', url);
      setImageUrl(url);

      // Reset keypoints for the new image
      const resetKeypoints = KEYPOINT_NAMES.map((_, index) => ({
        id: index,
        name: KEYPOINT_NAMES[index],
        x: 0,
        y: 0,
        status: 0,
      }));
      setKeypoints(resetKeypoints);
      setSelectedKeypoint(0);
      
      // Reset history for the new image
      setHistory([]);
      setHistoryIndex(-1);
    } catch (error) {
      console.error('Error loading next image:', error);
      // Set a text-based error image
      setImageUrl('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="384" viewBox="0 0 512 384"><rect width="512" height="384" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="%23888">Error loading image</text></svg>');
    }
  };

  useEffect(() => {
    // Load the initial image
    console.log('Initial load triggered');
    handleNext();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Keypoint Annotation Tool</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-5 h-5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo className="w-5 h-5" />
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <span>Next</span>
              </button>
              <DataForm keypoints={keypoints} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 p-8">
            <div className="max-w-screen-xl mx-auto">
              <Canvas
                keypoints={keypoints}
                selectedKeypoint={selectedKeypoint}
                imageUrl={imageUrl}
                onKeypointClick={(x, y) => {
                  const newKeypoints = keypoints.map((kp) =>
                    kp.id === selectedKeypoint ? { ...kp, x, y, status: 2 } : kp
                  );
                  const nextUnmarked = newKeypoints.findIndex((kp) => kp.status === 0);
                  const newSelectedKeypoint = nextUnmarked !== -1 ? nextUnmarked : selectedKeypoint;

                  setKeypoints(newKeypoints);
                  setSelectedKeypoint(newSelectedKeypoint);
                  addToHistory(newKeypoints, newSelectedKeypoint);
                }}
              />
              <div className="mt-4 text-center text-gray-600">
                Image 1 of 1 • Click to place keypoints • Use number keys (0-2) to change status
              </div>
            </div>
          </div>
          <Sidebar
            keypoints={keypoints}
            selectedKeypoint={selectedKeypoint}
            onKeypointSelect={setSelectedKeypoint}
            onStatusChange={(id, status) => {
              const newKeypoints = keypoints.map((kp) =>
                kp.id === id ? { ...kp, status } : kp
              );
              setKeypoints(newKeypoints);
              addToHistory(newKeypoints, selectedKeypoint);
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
