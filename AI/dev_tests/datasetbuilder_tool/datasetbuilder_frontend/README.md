# image-annotation-frontend

A web-based tool for annotating human body keypoints on images. The tool is designed to be used by data labelers to create training datasets for pose estimation models.

## Features

- **Keypoint Annotation**: Click on the image to place keypoints for various body parts.
- **Undo/Redo**: Easily undo or redo your actions using the buttons or keyboard shortcuts (Ctrl+Z for undo, Ctrl+Shift+Z for redo).
- **Status Change**: Change the status of keypoints (Unmarked, Occluded, Visible) using the number keys (0-2).
- **Save Annotations**: Save the annotated keypoints data for further processing.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide React**: A collection of icons for React.
- **Vite**: A build tool that provides a fast development environment.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/undTurt/image-annotation-frontend.git
   cd image-annotation-frontend
