import React from 'react';

const DataForm = ({ keypoints }) => {
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

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotation_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
      Export Data
    </button>
  );
};

export default DataForm;