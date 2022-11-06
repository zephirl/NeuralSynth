import './App.css';
import BodyTracking from './BodyTracking';
import Tones from './Tones';
import emptyBodyTrack from "./emptyBodyTrack.json";
import NavigationBar from './NavigationBar';

import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

function App() {

  const [bodyTrack, setBodyTrack] = useState(emptyBodyTrack);
  const [audioStatus, setAudioStatus] = useState(false);
  const [rightHandPos, setRightHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });

  useEffect(() => {
    // Set centroid of right hand's wrist, pinky and thumb points
    setRightHandPos({
      "x": (bodyTrack["poseLandmarks"][15]["x"] + bodyTrack["poseLandmarks"][17]["x"] + bodyTrack["poseLandmarks"][19]["x"]) / 3,
      "y": (bodyTrack["poseLandmarks"][15]["y"] + bodyTrack["poseLandmarks"][17]["y"] + bodyTrack["poseLandmarks"][19]["y"]) / 3,
      "z": (bodyTrack["poseLandmarks"][15]["z"] + bodyTrack["poseLandmarks"][17]["z"] + bodyTrack["poseLandmarks"][19]["z"]) / 3,
      "visibility": (bodyTrack["poseLandmarks"][15]["visibility"] + bodyTrack["poseLandmarks"][17]["visibility"] + bodyTrack["poseLandmarks"][19]["visibility"]) / 3
    });
  }, [bodyTrack])

  return (
    <React.Fragment>
      <NavigationBar />
      {bodyTrack["poseLandmarks"][15]["x"] === 0 && <div className="m-2">Loading... Please wait before interacting with the experience. </div>}
      <BodyTracking setBodyTrack={setBodyTrack} />
      {<div className="m-2">Right Wrist x: {rightHandPos["x"]}</div>}
      {<div className="m-2">Right Wrist y: {rightHandPos["y"]}</div>}
      <Button className="m-2" onClick={() => setAudioStatus(!audioStatus)}> audioStatus: {audioStatus ? 'On' : 'Off'} </Button>
      <Tones rightHandPos={rightHandPos} audioStatus={audioStatus} />
    </React.Fragment>
  );
}

export default App;