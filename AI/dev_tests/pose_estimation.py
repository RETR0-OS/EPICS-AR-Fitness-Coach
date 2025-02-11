import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np
from transformers import AutoProcessor, VitPoseForPoseEstimation
import torch

'''
    This script opens the device's webcam and streams the footage.
    The streamed footage is then passed through the YOLOv8 algorithm to detect the bounding box for the primary person in the image.
    The footage is then cropped to the bounding box containing the primary person.
    The cropped image will later be passed to ViTPose for Key-point detection.
'''


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

yolo = YOLO('yolov8s.pt')
# print(yolo.names)

image_processor = AutoProcessor.from_pretrained("usyd-community/vitpose-base-simple")
model = VitPoseForPoseEstimation.from_pretrained("usyd-community/vitpose-base-simple", device_map="cpu")


vCapture = cv2.VideoCapture(0)

while True:
    ret, frame = vCapture.read() #Capture webcam footage
    if not ret:
        print("Error reading frames") ##Error checking for webcam faults
        break
    frame = cv2.resize(frame, (256, 192))
    results = yolo.track(frame, stream=True, verbose=False) #Make object detection inferences

    for result in results:
        person_boxes = [x for x in result.boxes if bool(x.cls==0) and bool(float(x.conf) > 0.8)] #Get all people detected in the image with high confidence
        if person_boxes:
            main_box = []
            main_person = max(person_boxes, key=get_box_area) #Gets the person with the largest bounding box, as this is most probably the main person
            coordinates = main_person.xyxy[0].cpu().numpy().astype(int) #Gets the coordinates for the bounding box for the person
            main_box.append(coordinates) #Extracts coordinates of the bounding box for the main person
            rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #Convert to RGB color format
            pil_image = Image.fromarray(rgb_image) #Convert to PIL Image for processing

            #frame now contains the cropped image of the main person.
            main_box = np.array(main_box) # Convert to numpy array

            # Convert to (x, y, width, height) format for ViTPose
            main_box[:,2] = main_box[:,2] - main_box[:,0]
            main_box[:,3] = main_box[:,3] - main_box[:,1]

            # Process image and bounding box for pose estimation
            inputs = image_processor(pil_image, boxes=[main_box], return_tensors="pt")

            #get inferences from ViTPose
            with torch.no_grad():
                outputs = model(**inputs)

            # Post-process the results to get the keypoints
            pose_results = image_processor.post_process_pose_estimation(outputs, boxes=[main_box])

            image_pose_result = pose_results[0][0]["keypoints"]# Retrieves the keypoint coordinates for the main person in the image.

            #fixme: Add code to draw the keypoints on the image

            #fixme: Add code to upscale the image to the original size for display.

    cv2.imshow('frame', frame) #Display the re-rendered frame

    if cv2.waitKey(1) == ord('q'): #stop capturing if 'q' is clicked
        vCapture.release()
        cv2.destroyAllWindows()
        break
