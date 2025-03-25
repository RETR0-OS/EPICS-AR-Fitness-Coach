import React from 'react';
import { ChevronDown } from 'lucide-react';
import { KEYPOINT_NAMES } from '../types';

export function Sidebar({ keypoints, selectedKeypoint, onKeypointSelect, onStatusChange }) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Keypoints</h2>
        <div className="space-y-3">
          {keypoints.map((keypoint) => (
            <div
              key={keypoint.id}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedKeypoint === keypoint.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              onClick={() => onKeypointSelect(keypoint.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{KEYPOINT_NAMES[keypoint.id]}</span>
                <div className="relative">
                  <select
                    value={keypoint.status}
                    onChange={(e) => onStatusChange(keypoint.id, Number(e.target.value))}
                    className="appearance-none bg-transparent pr-8 py-1 pl-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Unmarked</option>
                    <option value={1}>Occluded</option>
                    <option value={2}>Visible</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">X:</span> {keypoint.x.toFixed(1)}
                </div>
                <div>
                  <span className="text-gray-500">Y:</span> {keypoint.y.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}