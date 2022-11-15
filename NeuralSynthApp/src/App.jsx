import './App.css';
import BodyTracking from './BodyTracking';
import emptyBodyTrack from "./emptyBodyTrack.json";
import NavigationBar from './NavigationBar';
import SettingsPanel from './SettingsPanel';
import InitilisationOverlay from './InitialisationOverlay';
import { getHandPos, getHandOpenness } from "./utils/BodyTrackingCalculations";

import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// Note: video is mirrored so confusion might arise from left/right naming of hands

function App() {
  const [initialising, setInitialising] = useState(true);
  const [isOverlayOpen, setOverlay] = useState(false);
  const [bodyTrack, setBodyTrack] = useState(emptyBodyTrack);
  const [rightHandPos, setRightHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });
  const [rightHandOpenness, setRightHandOpenness] = useState(0);
  const [leftHandPos, setLeftHandPos] = useState({ "x": 0, "y": 0, "z": 0, "visibility": 0 });
  const [leftHandOpenness, setLeftHandOpenness] = useState(0);

  const [audioStatus, setAudioStatus] = useState(false);
  const [instrument, setInstrument] = useState("sine");

  // Calulate center and openness of each hand after each new frame
  useEffect(() => {
    setRightHandPos(getHandPos(bodyTrack["poseLandmarks"], 0));
    setLeftHandPos(getHandPos(bodyTrack["poseLandmarks"], 1));
    ("leftHandLandmarks" in bodyTrack && setRightHandOpenness(getHandOpenness(bodyTrack["leftHandLandmarks"]))); // Checks if handLandmarks are available before to prevent division by 0 in code.
    ("rightHandLandmarks" in bodyTrack && setLeftHandOpenness(getHandOpenness(bodyTrack["rightHandLandmarks"])));
  }, [bodyTrack]);

  return (
    <React.Fragment>
      <InitilisationOverlay initialising={initialising} isOverlayOpen={isOverlayOpen} setOverlay={setOverlay}/>
      <NavigationBar setOverlay={setOverlay}/>
      <BodyTracking setBodyTrack={setBodyTrack} setInitialising={setInitialising} />
      <SettingsPanel instrument={instrument} setInstrument={setInstrument} audioStatus={audioStatus} setAudioStatus={setAudioStatus} rightHandPos={rightHandPos} rightHandOpenness={rightHandOpenness} leftHandPos={leftHandPos} leftHandOpenness={leftHandOpenness} />
    </React.Fragment>
  );
}

export default App;