import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np

'''
    This scripts opens the devices webcam an streams the footage.
    The streamed footage is them passed through the YOLOv8 algorithm to detect the bounding box for the primary person in the image
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
print(yolo.names)

vCapture = cv2.VideoCapture(0)

while True:
    ret, frame = vCapture.read() #Capture webcam footage
    if not ret:
        print("Error reading frames") ##Error checking for webcam faults
        break
    results = yolo.track(frame, stream=True, verbose=False) #Make object detection inferences

    for result in results:
        person_boxes = [x for x in result.boxes if bool(x.cls==0) and bool(float(x.conf) > 0.8)] #Get all people detected in the image with high confidence
        if person_boxes:
            main_person = max(person_boxes, key=get_box_area) #Gets the person with the largest bounding box, as this is most probably the main person
            coordinates = main_person.xyxy[0].cpu().numpy().astype(int) #Gets the coordinates for the bounding box for the person
            rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #Convert to RGB color format
            pil_image = Image.fromarray(rgb_image) #Convert to PIL Image for processing
            pil_image = pil_image.crop((coordinates[0], coordinates[1], coordinates[2], coordinates[3])).convert("RGB") #Crop the image to be closest to the focus person
            cv2_image = np.array(pil_image) #Convert back to CV2 image
            frame = cv2_image[:, :, ::-1].copy() #Convert to BGR format as this is the one used by openCV

    cv2.imshow('frame', frame) #Display the cropped frame

    if cv2.waitKey(1) == ord('q'): #stop capturing if 'q' is clicked
        vCapture.release()
        cv2.destroyAllWindows()
        break
