import ReactAudioPlayer from 'react-audio-player';
import audio from "./audiofile/sample.mp3";

import React from 'react'

function Audio(vol) {
  console.log("vol", vol)
  return (
    <React.Fragment>
      <ReactAudioPlayer
        src={audio}
        autoPlay
        controls
        volume={vol}
      />
    </React.Fragment>
  );
}

export default Audio;