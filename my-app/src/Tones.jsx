import {memo, useMemo, useEffect} from 'react'

import * as Tone from "tone";


function Tones(props) {
    console.log("tones", props);
    const {rightHandPos, audioStatus} = props;
    const osc = useMemo(() => new Tone.Oscillator(440, "sine").toDestination(), []); // useMemo to avoid creating new osc at each render

    // Start / Stop oscillator
    useEffect(() => {
        audioStatus ? (osc.start() && console.log("Audio Start")) : (osc.stop() && console.log("Audio Stop"));
    }, [audioStatus, osc])

    // Change oscillator params whenever rightHandPos changes
    useEffect(() => {
        // Change frequency
        if ((0 < rightHandPos["y"]) && (rightHandPos["y"] < 1)) {
            osc.set({frequency: (600-10)*(1-rightHandPos["y"])+10}); // (maxFreq-minFreq)*(horiz pos)+minFreq
        };
        // Change volume
        if ((0 < rightHandPos["x"]) && (rightHandPos["x"] < 1)) {
            osc.set({volume: (-20)*rightHandPos["x"]}); // -20 db vor min volume, 0 db for normal
        };
    }, [rightHandPos, osc])
}

export default memo(Tones);