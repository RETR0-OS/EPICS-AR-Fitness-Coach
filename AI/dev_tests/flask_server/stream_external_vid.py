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
    """
    Dummy route to serve the testing HTML file. Will be replaced by the frontend later.
    :return: the rendered HTML file
    """
    return render_template('index.html')  # Serve the HTML file

@socketio.on('frame')
def handle_frame(frame):
    """
    This function processes the frame received from the client and sends the processed frame back to the client.
    The transfer of frames is done using base64 encoding and websocket communication.
    :param frame: Base-64 encoded frame from the client
    :return: Base-64 encoded frame with keypoints drawn on the primary person
    """
    try:
        # Decode the base64 frame
        frame_data = frame.split(',')[1]  # Remove the data URL prefix
        frame_bytes = base64.b64decode(frame_data) # Decode the base64 frame
        frame = np.frombuffer(frame_bytes, dtype=np.uint8) # Convert the byte array to a numpy array
        frame = cv2.imdecode(frame, cv2.IMREAD_COLOR) # Convert the numpy array to an image

        frame = keypoint_model.find_main_person(frame) # Find the primary person in the frame and draw keypoints
        # Convert the processed frame back to base64
        _, buffer = cv2.imencode('.jpg', frame) # Encode the frame to JPEG
        processed_frame = base64.b64encode(buffer).decode('utf-8') # Encode the frame to base64
        processed_frame = f'data:image/jpeg;base64,{processed_frame}'   # Add the data URL prefix

        # Send processed frame back to client
        socketio.emit('processed_frame', processed_frame)
    except Exception as e:
        print()
        print(f"Error processing frame: {e}")
        print()
        pass

if __name__ == '__main__':
    #Serve the websocket server at localhost:5000
    socketio.run(app, host='localhost', port=5000, debug=True, use_reloader=False)