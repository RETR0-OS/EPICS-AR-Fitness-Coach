# Dataset Representation
```Python
dataset = {
    "images": [
        {
            "id": 1,
            "file_name": "person_doing_squat.jpg",
            "height": 192,
            "width": 256
        },
        {
            "id": 2,
            "file_name": "person_standing.jpg",
            "height": 192,
            "width": 256
        }
    ],
    "annotations": [
        {
            "id": 1,
            "image_id": 1,
            "category_id": 1,
            "keypoints": [
                200, 150, 2,  # nose (visible)
                195, 160, 2,  # left_eye (visible)
                205, 160, 2,  # right_eye (visible)
                190, 170, 1,  # left_ear (not visible but labeled)
                210, 170, 2,  # right_ear (visible)
                180, 220, 2,  # left_shoulder (visible)
                220, 220, 2,  # right_shoulder (visible)
                160, 270, 0,  # left_elbow (not labeled)
                # ... remaining keypoints
            ],
            "bbox": [150, 100, 100, 200]  # [x, y, width, height]
        }
    ],
    "categories": [
        {
            "name": "person",
            "keypoints": [
                "nose", "left_eye", "right_eye", "left_ear", "right_ear",
                "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
                "left_wrist", "right_wrist", "left_hip", "right_hip",
                "left_knee", "right_knee", "left_ankle", "right_ankle"
            ]
        }
    ]
}
```

## Keypoint Notations
```text
0: Not labeled
1: Not visible
2: Visible
```
## Keypoint Order
```text
0: nose
1: left_eye
2: right_eye
3: left_ear
4: right_ear
5: left_shoulder
6: right_shoulder
7: left_elbow
8: right_elbow
9: left_wrist
10: right_wrist
11: left_hip
12: right_hip
13: left_knee
14: right_knee
15: left_ankle
16: right_ankle
```

# Steps
1. Build the dataset in the above format
2. Load the dataset in a custom KeypointDataset class
3. Build training configuration in PyTorch
4. Build custom trainer that extends the PyTorch Lightning Trainer class
5. Train the model with pytorch
6. Save the new model weights