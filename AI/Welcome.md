# AI Documentation

## Requirements.txt
Contains the different dependencies and their version numbers for the Python-based AI application.

## Dev_tests Directory
The Dev tests directory contains test code to test isolated features of the application. Dev tests directory code is **NOT** to be pushed to production.
### stream_from_webcam.py
This file contains test code to stream the video from the webcam of a device. The application may or may not use the code, depending upon whether video streaming is handled in python or JavaScript.
### yolo_human_detection.py
This scripts opens the devices webcam an streams the footage. The streamed footage is them passed through the YOLOv8 algorithm to detect the bounding box for the primary person in the image. The footage is then cropped to the bounding box containing the primary person. The cropped image will later be passed to ViTPose for Key-point detection.
### yolov8s.pt
The pre-trained YOLOv8 weights by Ultralytics downloaded by the ultralytics library required to run inferences.
