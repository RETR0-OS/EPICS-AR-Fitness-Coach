import React, { useRef, useEffect, useState } from 'react';

export function Canvas({ keypoints, selectedKeypoint, onKeypointClick }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/load_next/')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw keypoints
      keypoints.forEach((keypoint) => {
        if (keypoint.status === 0) return;

        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = keypoint.status === 2 ? '#22c55e' : '#eab308';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (keypoint.id === selectedKeypoint) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 8, 0, 2 * Math.PI);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };
  }, [keypoints, selectedKeypoint, imageUrl]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onKeypointClick(x, y);
  };

  return (
    <div ref={containerRef} className="relative w-[512px] h-[384px] mx-auto border-2 border-gray-200 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={512}
        height={384}
        onClick={handleCanvasClick}
        className="absolute top-0 left-0 cursor-crosshair"
      />
    </div>
  );
}
