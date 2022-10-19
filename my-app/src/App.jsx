import './App.css';
import { Holistic } from '@mediapipe/holistic'
import * as HOLISTIC from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'

import { useRef, useEffect } from 'react'

function App() {
  const webcamRef = useRef(null);  // Use ref to get each frame of video
  const canvasRef = useRef(null);
  var camera = null;

  function onResults(results) {
    // console.log(results);
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

    // Get model and initiate
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });

    holistic.onResults(onResults)

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video })
        },
        width: 640,
        height: 480
      });
      camera.start()
    }
  })

  return (
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
  );
}

export default App;
