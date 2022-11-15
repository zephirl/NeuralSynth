import { Holistic } from '@mediapipe/holistic'
import * as HOLISTIC from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'

import React, { useRef, useEffect, memo } from 'react'

function BodyTracking(props) {
    const { setBodyTrack, setInitialising } = props;

    const webcamRef = useRef(null);  // Use ref to get each frame of video
    const canvasRef = useRef(null);

    function onResults(results) {
        // Send tracking info if pose detected
        // TODO: alert if no pose detected
        const bodyTrack = results;
        ("poseLandmarks" in bodyTrack && setBodyTrack(bodyTrack));

        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Only overwrite existing pixels.
        canvasCtx.globalCompositeOperation = 'source-in';
        canvasCtx.fillStyle = '#00FF00';
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        // canvasCtx.fillText(results["poseLandmarks"][16]["x"], 50, 50);

        canvasCtx.drawImage(
            results.image, 0, 0, canvasElement.width, canvasElement.height);


        canvasCtx.globalCompositeOperation = 'source-over';
        window.drawConnectors(canvasCtx, results.poseLandmarks, HOLISTIC.POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 4 });
        window.drawLandmarks(canvasCtx, results.poseLandmarks,
            { color: '#FF0000', lineWidth: 2 });
        window.drawConnectors(canvasCtx, results.faceLandmarks, HOLISTIC.FACEMESH_TESSELATION,
            { color: '#C0C0C070', lineWidth: 1 });
        window.drawConnectors(canvasCtx, results.leftHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
            { color: '#CC0000', lineWidth: 5 });
        window.drawLandmarks(canvasCtx, results.leftHandLandmarks,
            { color: '#00FF00', lineWidth: 2 });
        window.drawConnectors(canvasCtx, results.rightHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
            { color: '#00CC00', lineWidth: 5 });
        window.drawLandmarks(canvasCtx, results.rightHandLandmarks,
            { color: '#FF0000', lineWidth: 2 });
        canvasCtx.restore();
    }

    useEffect(() => {
        var camera = null;

        // Get model and initiate
        const holistic = new Holistic({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            }
        });

        holistic.setOptions({
            modelComplexity: 0,
            smoothLandmarks: false,
            enableSegmentation: false,
            smoothSegmentation: false,
            refineFaceLandmarks: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            selfieMode: true,
        });

        holistic.onResults(onResults)

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            var sendCounter = 0;
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (sendCounter === 1) setInitialising(false);
                    await holistic.send({ image: webcamRef.current.video });
                    sendCounter++;
                },
                width: 640,
                height: 480
            });
            camera.start()
        }
    })

    return (
        <React.Fragment>
            <div className="App" >
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginRight: "auto",
                        marginLeft: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginRight: "auto",
                        marginLeft: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </div>
        </React.Fragment>
    );
}

// use memo() to avoid re-render on setBodyTrack state update
export default memo(BodyTracking);
