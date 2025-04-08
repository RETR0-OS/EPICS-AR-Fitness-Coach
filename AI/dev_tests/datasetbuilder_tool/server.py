from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import cv2

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})






@app.route('/save/', methods=['POST'])
def save():
    data = request.get_json()
    print(data.get("keypoints"))
    img_id = data["imageId"]
    start_idx = data["start_idx"]
    with open('dataset.json', 'r') as f:
        dataset = json.load(f)
    keypoints = data["keypoints"]
    dataset["annotations"][img_id]["keypoints"] = format_datset(data.get("keypoints"))
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
        image_id = dataset["images"][file_start_idx]["id"]
        image = dataset["images"][file_start_idx]["file_name"]
        print(image)
        frame = cv2.imread(image)
        cv2.rectangle(frame, (bounding_box[0], bounding_box[1]), (bounding_box[0] + bounding_box[2], bounding_box[1] + bounding_box[3]), (0, 255, 0), 2)
        _, buffer = cv2.imencode('.jpg', frame)
        response = make_response(jsonify({
            "image_id": image_id,
            "image_data": buffer.tobytes().decode('latin1')  # Encode binary data for JSON
        }))
        response.headers['Content-Type'] = 'application/json'
        return response

app.run()