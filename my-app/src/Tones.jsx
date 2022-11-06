import {memo, useMemo, useEffect} from 'react'

import * as Tone from "tone";


function Tones(props) {
    // console.log("tones", props);
    const {rightHandPos, rightHandOpenness, audioStatus} = props;
    const osc = useMemo(() => new Tone.Oscillator(440, "sine").toDestination(), []); // useMemo to avoid creating new osc at each render

    // Scale a range of numbers to another range of numbers
    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    // Start / Stop oscillator
    useEffect(() => {
        audioStatus ? (osc.start() && console.log("Audio Start")) : (osc.stop() && console.log("Audio Stop"));
    }, [audioStatus, osc])

    // Change oscillator params whenever rightHandPos changes
    useEffect(() => {
        // Change frequency with y position
        if ((0 < rightHandPos["y"]) && (rightHandPos["y"] < 1)) {
            osc.set({frequency: scale(1-rightHandPos["y"],0,1,10,600)});
        };
        // // Change volume with x position
        // if ((0 < rightHandPos["x"]) && (rightHandPos["x"] < 1)) {
        //     osc.set({volume: (-20)*rightHandPos["x"]}); // -20 db vor min volume, 0 db for normal
        // };
        // Change volume with hand openness
        let vol = scale(rightHandOpenness, 120, 180, -30, 0);
        (rightHandOpenness < 120 && (vol = -100));  // If hand closed -> mute
        osc.set({volume: vol});
        
    }, [rightHandPos, rightHandOpenness, osc])
}

export default memo(Tones);