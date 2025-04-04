from flask import Flask, request, jsonify, send_from_directory, make_response
import os
import json
import cv2

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Dataset Builder Tool!"

@app.route('/build/', methods=['GET'])
def build():
    return "build dataset page"

@app.route('/save/', methods=['POST'])
def save():
    data = request.get_json()
    img_id = data["id"]
    start_idx = data["start_idx"]
    with open('dataset.json', 'r') as f:
        dataset = json.load(f)
    keypoints = data["keypoints"]
    dataset["annotations"][img_id - start_idx]["keypoints"] = keypoints
    with open("idx_tracker.txt", "r") as f:
        file_start_idx = int(f.read())
    with open("idx_tracker.txt","w") as f:
        file_start_idx += 1
        f.write(str(file_start_idx))
    return jsonify({"message":"dataset saved"}), 200

@app.route('/load_next/', methods=['GET'])
def load_next():
    with open("idx_tracker","r") as f:
        file_start_idx = int(f.read())
    with open("dataset.json", "r") as f:
        dataset = json.load(f)
        bounding_box = dataset["annotations"][file_start_idx]["bbox"]
        print(bounding_box)
        image = dataset["images"][file_start_idx]["file_name"]
        frame = cv2.imread(image)
        cv2.rectangle(frame, (bounding_box[0], bounding_box[1]), (bounding_box[0] + bounding_box[2], bounding_box[1] + bounding_box[3]), (0, 255, 0), 2)
        _, buffer = cv2.imencode('.jpg', frame)
        response = make_response(buffer.tobytes())
        response.headers['Content-Type'] = 'image/jpeg'
        return response

app.run()