#This file is a test file that streams webcam footage using OpenCV.
#This test code can be used to extract real-time frames from streaming video for processing.
import cv2


stream = cv2.VideoCapture(0) #Provides a VideoCapture object to access the webcam 0 of the device

if not stream.isOpened():
    print("Video stream is not available")

#Display the video stream
while True:
    ret, frame = stream.read() #Reads the webcam footage frame by frame. Returns a boolean value that detects if a frame is present or not and the frame itself.
    if not ret:
        print("Video stream ended")
        break
    cv2.imshow("Video Capture", frame) #Displays the frame in a window
    if cv2.waitKey(1) == ord('q'): #Waits for a key to be pressed and exits the stream.
        break

stream.release() #Releases the stream resource locked by the code
cv2.destroyAllWindows() #Closes the window showing the capture.