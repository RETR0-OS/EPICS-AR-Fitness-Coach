import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np
from transformers import AutoProcessor, VitPoseForPoseEstimation
# import torch

cv2_img = cv2.imread("C:/Users/aadit/Downloads/WIN_20250308_21_55_54_Pro.jpg")
cv2_img = cv2.resize(cv2_img, (256, 192))

yolo = YOLO("../yolov8n.pt")

image_processor = AutoProcessor.from_pretrained("usyd-community/vitpose-base-simple")

results = yolo.track(cv2_img, stream=True, verbose=False)

for result in results:
    person_box = [x for x in result.boxes if bool(x.cls == 0) and bool(float(x.conf) > 0.7)][0]
    coordinates = [person_box.xyxy[0].cpu().numpy().astype(int)]
    rgb_image = cv2.cvtColor(cv2_img, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(rgb_image)
    coordinates = np.array(coordinates)
    coordinates[:, 2] = coordinates[:, 2] - coordinates[:, 0]
    coordinates[:, 3] = coordinates[:, 3] - coordinates[:, 1]
    inputs = image_processor(pil_image, boxes=[coordinates], return_tensors="pt").to(
        "cuda")  # Preprocess image for ViTPose and transfer to GPU
    print("#"*50)
    print(inputs)
    print(inputs.keys())
    print(inputs["pixel_values"][0].shape)
    print("#"*50)
#
# cv2.imshow("img", cv2_img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()