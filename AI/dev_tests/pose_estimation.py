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

part_mapper = ["nose", "left_eye", "right_eye", "left_ear", "right_ear", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle"]

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


def draw_keypoints(image, results):
    """
        This function draws the keypoints on the image and draws the corresponding skeleton.
        :param image: The image to draw the keypoints on
        :param results: The inference results of ViTPose base model
        :return: The image with the keypoints and skeleton drawn on it
    """
    keypoints = results["keypoints"] #Get keypoint coordinates
    scores = results["scores"]  #Get confidence scores for each keypoint
    available_keypoints = dict()
    for i in range(len(scores)):
        if scores[i] > 0.75:
            available_keypoints[part_mapper[i]] = keypoints[i] #Add keypoint to available keypoints.
            cv2.circle(image, (int(keypoints[i][0]), int(keypoints[i][1])), 5, (0, 255, 0), -1) #Draw point
    keys = list(available_keypoints.keys())

    #Draw skeleton
    #fixme: See if this can be done in a more efficient way
    if "nose" in keys:
        if "left_eye" in keys:
            cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])), (int(available_keypoints["left_eye"][0]), int(available_keypoints["left_eye"][1])), (0, 255, 0), 2)
        if "right_eye" in keys:
            cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])), (int(available_keypoints["right_eye"][0]), int(available_keypoints["right_eye"][1])), (0, 255, 0), 2)
        if "left_shoulder" in keys:
            cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])), (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])), (0, 255, 0), 2)
        if "right_shoulder" in keys:
            cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])), (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])), (0, 255, 0), 2)
    if "left_eye" in keys and "left_ear" in keys:
        cv2.line(image, (int(available_keypoints["left_eye"][0]), int(available_keypoints["left_eye"][1])), (int(available_keypoints["left_ear"][0]), int(available_keypoints["left_ear"][1])), (0, 255, 0), 2)
    if "right_eye" in keys and "right_ear" in keys:
        cv2.line(image, (int(available_keypoints["right_eye"][0]), int(available_keypoints["right_eye"][1])), (int(available_keypoints["right_ear"][0]), int(available_keypoints["right_ear"][1])), (0, 255, 0), 2)
    if "left_shoulder" in keys and "left_elbow" in keys:
        if "left_elbow" in keys:
            cv2.line(image, (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])), (int(available_keypoints["left_elbow"][0]), int(available_keypoints["left_elbow"][1])), (0, 255, 0), 2)
        if "right_shoulder" in keys:
            cv2.line(image, (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])), (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])), (0, 255, 0), 2)
        if "left_hip" in keys:
            cv2.line(image, (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])), (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])), (0, 255, 0), 2)
    if "right_shoulder" in keys:
        if "right_elbow" in keys:
            cv2.line(image, (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])), (int(available_keypoints["right_elbow"][0]), int(available_keypoints["right_elbow"][1])), (0, 255, 0), 2)
        if "right_hip" in keys:
            cv2.line(image, (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])), (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])), (0, 255, 0), 2)
    if "left_elbow" in keys and "left_wrist" in keys:
        cv2.line(image, (int(available_keypoints["left_elbow"][0]), int(available_keypoints["left_elbow"][1])), (int(available_keypoints["left_wrist"][0]), int(available_keypoints["left_wrist"][1])), (0, 255, 0), 2)
    if "right_elbow" in keys and "right_wrist" in keys:
        cv2.line(image, (int(available_keypoints["right_elbow"][0]), int(available_keypoints["right_elbow"][1])), (int(available_keypoints["right_wrist"][0]), int(available_keypoints["right_wrist"][1])), (0, 255, 0), 2)
    if "left_hip" in keys:
        if "left_knee" in keys:
            cv2.line(image, (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])), (int(available_keypoints["left_knee"][0]), int(available_keypoints["left_knee"][1])), (0, 255, 0), 2)
        if "right_hip" in keys:
            cv2.line(image, (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])), (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])), (0, 255, 0), 2)
    if "right_hip" in keys and "right_knee" in keys:
        cv2.line(image, (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])), (int(available_keypoints["right_knee"][0]), int(available_keypoints["right_knee"][1])), (0, 255, 0), 2)
    if "left_knee" in keys and "left_ankle" in keys:
        cv2.line(image, (int(available_keypoints["left_knee"][0]), int(available_keypoints["left_knee"][1])), (int(available_keypoints["left_ankle"][0]), int(available_keypoints["left_ankle"][1])), (0, 255, 0), 2)
    if "right_knee" in keys and "right_ankle" in keys:
        cv2.line(image, (int(available_keypoints["right_knee"][0]), int(available_keypoints["right_knee"][1])), (int(available_keypoints["right_ankle"][0]), int(available_keypoints["right_ankle"][1])), (0, 255, 0), 2)
    return image


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
            # print(pose_results)
            frame = draw_keypoints(frame, pose_results[0][0])

            #fixme: Add code to upscale the image to the original size for display.
            frame = cv2.resize(frame, (800, 700))
    cv2.imshow('frame', frame) #Display the re-rendered frame

    if cv2.waitKey(1) == ord('q'): #stop capturing if 'q' is clicked
        vCapture.release()
        cv2.destroyAllWindows()
        break
