import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np
from transformers import AutoProcessor, VitPoseForPoseEstimation
import torch


class KeypointFinder:
    def __init__(self):
        """
            This class is used to find the main person in the frame and draw the keypoints on the person.
            The class uses the YOLOv8 algorithm to detect the bounding box for the main person in the frame.
            The detected bounding box is then passed to the ViTPose model to detect the keypoints for the person.
            The keypoints are then drawn on the person in the frame.
        """
        self.yolo = YOLO("../yolov8n.pt") #Load the YOLOv8 model (now using the "n" version for higher speed)
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu") #Check if GPU is available
        # print(f"Inferences running on device: {self.device} : {torch.cuda.get_device_name(self.device)}") (optional to ensure that inferences are running on the correct device)
        self.image_processor = AutoProcessor.from_pretrained("usyd-community/vitpose-base-simple") #Load the VitPose-base image preprocessor
        self.model = VitPoseForPoseEstimation.from_pretrained("usyd-community/vitpose-base-simple").to(self.device) #Load the VitPose-base model
        self.part_mapper = [
            "nose",
            "left_eye",
            "right_eye",
            "left_ear",
            "right_ear",
            "left_shoulder",
            "right_shoulder",
            "left_elbow",
            "right_elbow",
            "left_wrist",
            "right_wrist",
            "left_hip",
            "right_hip",
            "left_knee",
            "right_knee",
            "left_ankle",
            "right_ankle"
        ] #Map the keypoint indices to the corresponding body parts

    @staticmethod
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

    def get_keypoints(self, image, main_box):
        """
        This function gets the keypoints for the main person in the frame.
        :param image: the PIL image to get the keypoints for
        :param main_box: The bounding box coordinates for the main person in the frame
        :return: An array of 17 keypoint coordinates for the main person in the frame
        """
        inputs = self.image_processor(image, boxes=[main_box], return_tensors="pt").to(self.device)
        with torch.no_grad():
            outputs = self.model(**inputs)
        return outputs

    def draw_keypoints(self, image, results):
        """
                This function draws the keypoints on the image and draws the corresponding skeleton.
                :param image: The image to draw the keypoints on
                :param results: The inference results of ViTPose base model
                :return: The image with the keypoints and skeleton drawn on it
            """
        keypoints = results["keypoints"]  # Get keypoint coordinates
        scores = results["scores"]  # Get confidence scores for each keypoint
        available_keypoints = dict()
        for i in range(len(scores)):
            if scores[i] > 0.5:
                available_keypoints[self.part_mapper[i]] = keypoints[i]  # Add keypoint to available keypoints.
                cv2.circle(image, (int(keypoints[i][0]), int(keypoints[i][1])), 2, (0, 255, 0), -1)  # Draw point
        keys = list(available_keypoints.keys())

        # Draw skeleton
        # fixme: See if this can be done in a more efficient way
        if "nose" in keys:
            if "left_eye" in keys:
                cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])),
                         (int(available_keypoints["left_eye"][0]), int(available_keypoints["left_eye"][1])),
                         (0, 255, 0), 1)
            if "right_eye" in keys:
                cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])),
                         (int(available_keypoints["right_eye"][0]), int(available_keypoints["right_eye"][1])),
                         (0, 255, 0), 1)
            if "left_shoulder" in keys:
                cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])),
                         (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])),
                         (0, 255, 0), 1)
            if "right_shoulder" in keys:
                cv2.line(image, (int(available_keypoints["nose"][0]), int(available_keypoints["nose"][1])),
                         (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])),
                         (0, 255, 0), 1)
        if "left_eye" in keys and "left_ear" in keys:
            cv2.line(image, (int(available_keypoints["left_eye"][0]), int(available_keypoints["left_eye"][1])),
                     (int(available_keypoints["left_ear"][0]), int(available_keypoints["left_ear"][1])), (0, 255, 0), 1)
        if "right_eye" in keys and "right_ear" in keys:
            cv2.line(image, (int(available_keypoints["right_eye"][0]), int(available_keypoints["right_eye"][1])),
                     (int(available_keypoints["right_ear"][0]), int(available_keypoints["right_ear"][1])), (0, 255, 0),
                     1)
        if "left_shoulder" in keys and "left_elbow" in keys:
            if "left_elbow" in keys:
                cv2.line(image,
                         (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])),
                         (int(available_keypoints["left_elbow"][0]), int(available_keypoints["left_elbow"][1])),
                         (0, 255, 0), 1)
            if "right_shoulder" in keys:
                cv2.line(image,
                         (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])),
                         (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])),
                         (0, 255, 0), 1)
            if "left_hip" in keys:
                cv2.line(image,
                         (int(available_keypoints["left_shoulder"][0]), int(available_keypoints["left_shoulder"][1])),
                         (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])),
                         (0, 255, 0), 1)
        if "right_shoulder" in keys:
            if "right_elbow" in keys:
                cv2.line(image,
                         (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])),
                         (int(available_keypoints["right_elbow"][0]), int(available_keypoints["right_elbow"][1])),
                         (0, 255, 0), 1)
            if "right_hip" in keys:
                cv2.line(image,
                         (int(available_keypoints["right_shoulder"][0]), int(available_keypoints["right_shoulder"][1])),
                         (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])),
                         (0, 255, 0), 1)
        if "left_elbow" in keys and "left_wrist" in keys:
            cv2.line(image, (int(available_keypoints["left_elbow"][0]), int(available_keypoints["left_elbow"][1])),
                     (int(available_keypoints["left_wrist"][0]), int(available_keypoints["left_wrist"][1])),
                     (0, 255, 0), 1)
        if "right_elbow" in keys and "right_wrist" in keys:
            cv2.line(image, (int(available_keypoints["right_elbow"][0]), int(available_keypoints["right_elbow"][1])),
                     (int(available_keypoints["right_wrist"][0]), int(available_keypoints["right_wrist"][1])),
                     (0, 255, 0), 1)
        if "left_hip" in keys:
            if "left_knee" in keys:
                cv2.line(image, (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])),
                         (int(available_keypoints["left_knee"][0]), int(available_keypoints["left_knee"][1])),
                         (0, 255, 0), 1)
            if "right_hip" in keys:
                cv2.line(image, (int(available_keypoints["left_hip"][0]), int(available_keypoints["left_hip"][1])),
                         (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])),
                         (0, 255, 0), 1)
        if "right_hip" in keys and "right_knee" in keys:
            cv2.line(image, (int(available_keypoints["right_hip"][0]), int(available_keypoints["right_hip"][1])),
                     (int(available_keypoints["right_knee"][0]), int(available_keypoints["right_knee"][1])),
                     (0, 255, 0), 1)
        if "left_knee" in keys and "left_ankle" in keys:
            cv2.line(image, (int(available_keypoints["left_knee"][0]), int(available_keypoints["left_knee"][1])),
                     (int(available_keypoints["left_ankle"][0]), int(available_keypoints["left_ankle"][1])),
                     (0, 255, 0), 1)
        if "right_knee" in keys and "right_ankle" in keys:
            cv2.line(image, (int(available_keypoints["right_knee"][0]), int(available_keypoints["right_knee"][1])),
                     (int(available_keypoints["right_ankle"][0]), int(available_keypoints["right_ankle"][1])),
                     (0, 255, 0), 1)
        return image

    def find_main_person(self, frame):
        """
        The driver function for the KeypointFinder class. This function detects the main person in the frame and draws the keypoints on the person.
        :param frame: the CV2 frame to process.
        :return: the processed image with the keypoints drawn on the main person.
        """
        frame = cv2.resize(frame, (256, 192)) #Resize frame for the VitPose model
        results = self.yolo(frame, verbose=False) #Get the bounding boxes for the objects in the frame
        for result in results:
            person_boxes = [x for x in result.boxes if bool(x.cls == 0) and bool(float(x.conf) > 0.7)]  # Get all people detected in the image with high confidence
            if person_boxes:
                main_box = []
                main_person = max(person_boxes, key=self.get_box_area)  # Gets the person with the largest bounding box, as this is most probably the main person
                coordinates = main_person.xyxy[0].cpu().numpy().astype(int)  # Gets the coordinates for the bounding box for the person
                main_box.append(coordinates)  # Extracts coordinates of the bounding box for the main person
                rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert to RGB color format
                pil_image = Image.fromarray(rgb_image)  # Convert to PIL Image for processing
                main_box = np.array(main_box) # Convert to numpy array for processing

                # Convert to (x, y, width, height) format for ViTPose
                main_box[:, 2] = main_box[:, 2] - main_box[:, 0]
                main_box[:, 3] = main_box[:, 3] - main_box[:, 1]

                outputs = self.get_keypoints(pil_image, main_box) #Get the keypoint coordinates for the main person in the frame

                boxes_tensor = torch.from_numpy(main_box).to("cpu", dtype=torch.float32) #Convert the bounding box to a tensor and move to CPU for processing

                pose_results = self.image_processor.post_process_pose_estimation(outputs, boxes=[boxes_tensor]) #Post process the pose estimation results on CPU

                pose_results = [{k: v.cpu().numpy() for k, v in result.items()} for result in pose_results[0]] #Transfer results to CPU for processing and convert to numpy arrays

                frame = self.draw_keypoints(frame, pose_results[0]) #Get the image with the skeleton drawn on the main person

        frame = cv2.resize(frame, (800, 700)) #Resize the frame for display
        return frame