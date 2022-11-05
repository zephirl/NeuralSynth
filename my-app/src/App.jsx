import './App.css';
import BodyTracking from './BodyTracking';
import Audio from "./audios/Audio";
import Tones from './Tones';

import React, { useState } from 'react'

function App() {

  // console.log('App')

  const [bodyTrack, setBodyTrack] = useState(1);
  const [audioStatus, setAudioStatus] = useState(false);

  return (
    <React.Fragment>
      <BodyTracking setBodyTrack={setBodyTrack} />
      {/* <Audio vol={bodyTrack}/> */}
      <div>BodyTrack: {bodyTrack["y"]}</div>
      <button onClick={() => setAudioStatus(!audioStatus)}> audioStatus: {audioStatus ? 'On' : 'Off'} </button>
      <Tones bodyTrack={bodyTrack} audioStatus={audioStatus} />
    </React.Fragment>
  );
}

export default App;
