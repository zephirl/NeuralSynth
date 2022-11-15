import { angleBetween3DCoords } from "./AngleBetween3PointsIn3DSpace";

// Get center of hand by calculating centroid of wrist, pinky and thumb point triangle
// Hand choice: hand=0 for right and hand=1 for left
// Left and right hands poseLandmarks differ by 1 hence the "+hand"
// More information about poseLandmarks here: https://google.github.io/mediapipe/solutions/pose.html
export function getHandPos(poseLandmarks, hand) {
    return {
        "x": (poseLandmarks[15 + hand]["x"] + poseLandmarks[17 + hand]["x"] + poseLandmarks[21 + hand]["x"]) / 3,
        "y": (poseLandmarks[15 + hand]["y"] + poseLandmarks[17 + hand]["y"] + poseLandmarks[21 + hand]["y"]) / 3,
        "z": (poseLandmarks[15 + hand]["z"] + poseLandmarks[17 + hand]["z"] + poseLandmarks[21 + hand]["z"]) / 3,
        "visibility": (poseLandmarks[15 + hand]["visibility"] + poseLandmarks[17 + hand]["visibility"] + poseLandmarks[21 + hand]["visibility"]) / 3
    };
};


// Gets average angle of each finger joints to determine hand openness
export function getHandOpenness(handLandmarks) {
    let handTotalAngle = 0;

    // Gets the total angles of a finger added joint by joint
    function getFingerTotalAngle(finger) {
        let fingerTotalAngle = 0;
        for (let joint = 0; joint < 3; joint++) {
            let coord1 = handLandmarks[finger * 4 + joint];
            (joint === 0 && (coord1 = handLandmarks[0])); // If first joint of finger, get wrist as first point, which is 0
            const coord2 = handLandmarks[finger * 4 + joint + 1]
            const coord3 = handLandmarks[finger * 4 + joint + 2]

            fingerTotalAngle += angleBetween3DCoords(coord1, coord2, coord3);
        };
        return fingerTotalAngle;
    };

    for (let finger = 0; finger < 5; finger++) {
        handTotalAngle += getFingerTotalAngle(finger);
    };

    return (handTotalAngle/15); // There are 15 joints => average
};
