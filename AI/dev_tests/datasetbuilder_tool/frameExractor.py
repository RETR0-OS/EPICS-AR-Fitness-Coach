import cv2
from ultralytics import YOLO
import os
import numpy as np
import json

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

yolo_model = YOLO("../yolov8n.pt")
directory = input("Enter absolute path of videos directory>> ")
video_files = os.listdir(directory)
output_dir = "extracted_images"
frame_rate = int(input("Enter extraction frame rate>> "))
dev_id = int(input("Enter your developer ID number>>"))
dataset_file = json.load(open("dataset.json", "r"))

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
        results = yolo_model.track(frame, stream=False, verbose=False)
        for result in results:
            person_boxes = [x for x in result.boxes if bool(x.cls == 0) and bool(float(x.conf) > 0.7)]  # Get all people detected in the image with high confidence
            if len(person_boxes) == 0:
                print("No person detected in frame")
                break
            main_box = []
            main_person = max(person_boxes, key=get_box_area)
            coordinates = main_person.xyxy[0].cpu().numpy().astype(int)  # Gets the coordinates for the bounding box for the person
            main_box.append(coordinates)
            main_box = np.array(main_box)  # Convert to numpy array

            # Convert to (x, y, width, height) format for ViTPose
            main_box[:, 2] = main_box[:, 2] - main_box[:, 0]
            main_box[:, 3] = main_box[:, 3] - main_box[:, 1]
            file_name = os.path.join(output_dir, f"{x}_frame_{i}.jpg")
            cv2.imwrite(file_name, frame)
            image_information = {
                "id": dev_id,
                "file_name": file_name,
                "height": 192,
                "width": 256
            }
            dataset_file["images"].append(image_information)
            dataset_file["annotations"].append({
                "id": dev_id,
                "image_id": dev_id,
                "category_id": 1,
                "keypoints": [],
                "bbox": main_box.tolist()
            })
            dev_id += 1
print(f"Extracted {len(os.listdir(output_dir))} frames")
with open("dataset.json", "w") as f:
    json.dump(dataset_file, f, indent=4)