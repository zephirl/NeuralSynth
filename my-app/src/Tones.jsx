import React, {memo, useMemo, useEffect} from 'react'

import * as Tone from "tone";


function Tones(props) {
    console.log("tones", props);
    const {bodyTrack, audioStatus} = props;
    const osc = useMemo(() => new Tone.Oscillator(440, "sine").toDestination(), []); // useMemo to avoid creating new osc

    // Start / Stop oscillator
    useEffect(() => {
        audioStatus ? (osc.start() && console.log("s")) : (osc.stop() && console.log("no"));
    }, [audioStatus, osc])

    // Change oscillator params
    useEffect(() => {
        // Change frequency
        if ((0 < bodyTrack["y"]) && (bodyTrack["y"] < 1)) {
            osc.set({frequency: (600-10)*(1-bodyTrack["y"])+10}); // (maxFreq-minFreq)*(horiz pos)+minFreq
        };
        // Change volume
        if ((0 < bodyTrack["x"]) && (bodyTrack["x"] < 1)) {
            osc.set({volume: (-20)*bodyTrack["x"]}); // -20 db vor min volume, 0 db for normal
        };
    }, [bodyTrack, osc])
}

export default memo(Tones);