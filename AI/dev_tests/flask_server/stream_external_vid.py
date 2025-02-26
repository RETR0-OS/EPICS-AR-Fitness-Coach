from flask import Flask, render_template
from flask_socketio import SocketIO
import base64
import cv2
import numpy as np
from keypoint_builder import KeypointFinder

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

keypoint_model = KeypointFinder()

@app.route('/')
def index():
    return render_template('index.html')  # Serve the HTML file

@socketio.on('frame')
def handle_frame(frame):
    try:
        # Decode the base64 frame
        frame_data = frame.split(',')[1]  # Remove the data URL prefix
        frame_bytes = base64.b64decode(frame_data)
        frame = np.frombuffer(frame_bytes, dtype=np.uint8)
        frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)

        frame = keypoint_model.find_main_person(frame)
        # Convert the processed frame back to base64
        _, buffer = cv2.imencode('.jpg', frame)
        processed_frame = base64.b64encode(buffer).decode('utf-8')
        processed_frame = f'data:image/jpeg;base64,{processed_frame}'

        # Send processed frame back to client
        socketio.emit('processed_frame', processed_frame)
    except Exception as e:
        print()
        print(f"Error processing frame: {e}")
        print()
        pass

if __name__ == '__main__':
    socketio.run(app, host='localhost', port=5000, debug=True, use_reloader=False)