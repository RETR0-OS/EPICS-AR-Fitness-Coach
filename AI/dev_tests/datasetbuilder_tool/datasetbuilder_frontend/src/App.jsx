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
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (newKeypoints, newSelectedKeypoint) => {
    const newHistory = [...history.slice(0, historyIndex + 1), { keypoints: newKeypoints, selectedKeypoint: newSelectedKeypoint }];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleKeypointClick = (x, y) => {
    const newKeypoints = keypoints.map((kp) =>
      kp.id === selectedKeypoint ? { ...kp, x, y, status: 2 } : kp
    );
    const nextUnmarked = newKeypoints.findIndex((kp) => kp.status === 0);
    const newSelectedKeypoint = nextUnmarked !== -1 ? nextUnmarked : selectedKeypoint;

    setKeypoints(newKeypoints);
    setSelectedKeypoint(newSelectedKeypoint);
    addToHistory(newKeypoints, newSelectedKeypoint);
  };

  const handleStatusChange = (id, status) => {
    const newKeypoints = keypoints.map((kp) =>
      kp.id === id ? { ...kp, status } : kp
    );
    setKeypoints(newKeypoints);
    addToHistory(newKeypoints, selectedKeypoint);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousState = history[newIndex];
      setKeypoints(previousState.keypoints);
      setSelectedKeypoint(previousState.selectedKeypoint);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      const initialKeypoints = KEYPOINT_NAMES.map((_, index) => ({
        id: index,
        name: KEYPOINT_NAMES[index],
        x: 0,
        y: 0,
        status: 0,
      }));
      setKeypoints(initialKeypoints);
      setSelectedKeypoint(0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setHistoryIndex(newIndex);
      setKeypoints(nextState.keypoints);
      setSelectedKeypoint(nextState.selectedKeypoint);
    }
  };

  const handleSave = () => {
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
    console.log('Saving annotation data:', data);
    // Add actual save logic here
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (e.key >= '0' && e.key <= '2') {
        handleStatusChange(selectedKeypoint, Number(e.key));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedKeypoint, historyIndex, history]);

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
                onKeypointClick={handleKeypointClick}
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
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
