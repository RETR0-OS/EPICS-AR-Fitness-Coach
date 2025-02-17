import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Get available video devices
    const getDevices = async () => {
      try {
        // Request camera permissions first
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop the initial stream to release the camera
        stream.getTracks().forEach(track => track.stop());
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getDevices();
  }, []);

  const videoConstraints = {
    deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
    width: 1920,
    height: 1080,
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-black overflow-hidden">
      {/* Webcam Feed */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Webcam
          ref={webcamRef}
          className="max-h-full max-w-full object-contain"
          mirrored={true}
          videoConstraints={videoConstraints}
          forceScreenshotSourceSize={true}
        />
      </div>

      {/* Camera Selector */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <select
          value={selectedDevice || ''}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              Camera {index + 1} - {device.label || `Device ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WebcamCapture;
