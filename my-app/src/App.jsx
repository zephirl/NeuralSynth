import './App.css';
import BodyTracking from './BodyTracking';
import emptyBodyTrack from "./emptyBodyTrack.json";
import NavigationBar from './NavigationBar';
import { getHandPos, getHandOpenness } from "./utils/BodyTrackingCalculations";
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsPanel from './SettingsPanel';

// Note: video is mirrored so confusion might arise from left/right naming of hands

function App() {

  const [bodyTrack, setBodyTrack] = useState(emptyBodyTrack);
  const [rightHandPos, setRightHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });
  const [rightHandOpenness, setRightHandOpenness] = useState(0);
  const [leftHandPos, setLeftHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });
  const [leftHandOpenness, setLeftHandOpenness] = useState(0);

  const [audioStatus, setAudioStatus] = useState(false);
  const [instrument, setInstrument] = useState("sine");


  useEffect(() => {
    setRightHandPos(getHandPos(bodyTrack["poseLandmarks"], 0));
    setLeftHandPos(getHandPos(bodyTrack["poseLandmarks"], 1));
    ("leftHandLandmarks" in bodyTrack && setRightHandOpenness(getHandOpenness(bodyTrack["leftHandLandmarks"])));
    ("rightHandLandmarks" in bodyTrack && setLeftHandOpenness(getHandOpenness(bodyTrack["rightHandLandmarks"])));

  }, [bodyTrack])

  return (
    <React.Fragment>
      <NavigationBar />
      {bodyTrack["poseLandmarks"][15]["x"] === 0 && <div className="m-2">Loading... Please wait before interacting with the experience. </div>}
      <BodyTracking setBodyTrack={setBodyTrack} />
      <SettingsPanel instrument={instrument} setInstrument={setInstrument} audioStatus={audioStatus} setAudioStatus={setAudioStatus} rightHandPos={rightHandPos} rightHandOpenness={rightHandOpenness} leftHandPos={leftHandPos} leftHandOpenness={leftHandOpenness}/>
    </React.Fragment>
  );
}

export default App;