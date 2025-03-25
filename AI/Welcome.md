# AI Documentation

## Requirements.txt
Contains the different dependencies and their version numbers for the Python-based AI application.

## Dev_tests Directory
The Dev tests directory contains test code to test isolated features of the application. Dev tests directory code is **NOT** to be pushed to production.
### stream_from_webcam.py
This file contains test code to stream the video from the webcam of a device. The application may or may not use the code, depending upon whether video streaming is handled in python or JavaScript.
### yolo_human_detection.py
This script opens the device's webcam and streams the footage. The streamed footage is then passed through the YOLOv8 algorithm to detect the bounding box for the primary person in the image. The footage is then cropped to the bounding box containing the primary person. The cropped image will later be passed to ViTPose for Key-point detection.
### yolov8s.pt
The pre-trained YOLOv8 weights by Ultralytics downloaded by the ultralytics library required to run inferences.

### pose_estimation.py
Extends the YOLOv8 human detection script to include pose estimation using the ViTPose algorithm. The script resizes the input frame to match the ViTPose model's input size instead of cropping to save on computation on key-point calculation and then passes the frame to the ViTPose model to get the key points. The inferred keypoints are then drawn on the frame and the corresponding skeletion is generated. The frame is then displayed on the screen. The script uses GPU inference for the ViTPose model, if available in the environment. The device-agnostic code ensure that the script runs in both environments with a GPU and ones without, while providing maximum efficiency.
