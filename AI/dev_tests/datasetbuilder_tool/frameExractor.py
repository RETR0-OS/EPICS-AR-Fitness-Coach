import cv2
from ultralytics import YOLO
import os

yolo_model = YOLO("../yolov8n.pt")
directory = input("Enter absolute path of videos directory>> ")
video_files = os.listdir(directory)
output_dir = input("Enter absolute path of the output directory>> ")
frame_rate = int(input("Enter extraction frame rate>> "))

def get_box_area(box):
    """
        This function returns the area of the bounding box bounding an object.
        :param box: The bounding box for the object in the frame
        :return: float representing the area of the bounding box
    """
    coordinates = box.xyxy[0].cpu().numpy().astype(int)
    width = coordinates[2] - coordinates[0]
    height = coordinates[3] - coordinates[1]
    return width * height

for x in video_files:
    video_capture = cv2.VideoCapture(os.path.join(directory, x))
    if not video_capture.isOpened():
        print(f"Error opening video file: {os.path.join(directory, x)}")
        continue
    for i in range(0, int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT)), frame_rate):
        video_capture.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = video_capture.read()
        if not ret:
            continue
        frame = cv2.resize(frame, (256, 192))
        results = yolo_model.track(frame, stream=True, verbose=False)
        for result in results:
            person_boxes = [x for x in result.boxes if bool(x.cls == 0) and bool(float(x.conf) > 0.7)]  # Get all people detected in the image with high confidence
            if not person_boxes:
                print("No person detected in frame")
                break
            cv2.imwrite(os.path.join(output_dir, f"{x}_frame_{i}.jpg"), frame)
print(f"Extracted {len(os.listdir(output_dir))} frames")