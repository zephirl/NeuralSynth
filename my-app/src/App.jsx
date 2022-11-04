import './App.css';
import BodyTracking from './BodyTracking';
import Audio from "./audios/Audio";

import React, {useState } from 'react'

function App() {

  console.log('App')

  const [bodyTrack, setBodyTrack] = useState(1);

  return (
    <React.Fragment>
      <BodyTracking setBodyTrack={setBodyTrack} />
      <Audio vol={bodyTrack}/>
      <div>BodyTrack: {bodyTrack}</div>
    </React.Fragment>
  );
}

export default App;
