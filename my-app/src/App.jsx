import './App.css';
import BodyTracking from './BodyTracking';
import Tones from './Tones';
import emptyBodyTrack from "./emptyBodyTrack.json";
import NavigationBar from './NavigationBar';
import { getHandPos, getHandOpenness } from "./utils/BodyTrackingCalculations";
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

// Note: video is mirrored so confusion might arise from left/right naming of hands

function App() {

  const [bodyTrack, setBodyTrack] = useState(emptyBodyTrack);
  const [audioStatus, setAudioStatus] = useState(false);
  const [rightHandPos, setRightHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });
  const [rightHandOpenness, setRightHandOpenness] = useState(0);

  useEffect(() => {
    setRightHandPos(getHandPos(bodyTrack["poseLandmarks"], 0));
    ("leftHandLandmarks" in bodyTrack && setRightHandOpenness(getHandOpenness(bodyTrack["leftHandLandmarks"])));
  }, [bodyTrack])

  return (
    <React.Fragment>
      <NavigationBar />
      {bodyTrack["poseLandmarks"][15]["x"] === 0 && <div className="m-2">Loading... Please wait before interacting with the experience. </div>}
      <BodyTracking setBodyTrack={setBodyTrack} />
      {<div className="m-2">Right hand x: {rightHandPos["x"]}</div>}
      {<div className="m-2">Right hand y: {rightHandPos["y"]}</div>}
      {<div className="m-2">Right hand average finger joint angle: {rightHandOpenness}</div>}
      <Button className="m-2" onClick={() => setAudioStatus(!audioStatus)}> audioStatus: {audioStatus ? 'On' : 'Off'} </Button>
      <Tones rightHandPos={rightHandPos} rightHandOpenness={rightHandOpenness} audioStatus={audioStatus} />
    </React.Fragment>
  );
}

export default App;