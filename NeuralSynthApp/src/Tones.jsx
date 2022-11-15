import { memo, useMemo, useEffect } from 'react'

import * as Tone from "tone";


function Tones(props) {
    const { rightHandPos, rightHandOpenness, audioStatus, leftHandOpenness, leftHandPos, instrument, audioUpdate } = props;
    const osc = useMemo(() => new Tone.Oscillator(440, "sine").toDestination(), []); // useMemo to avoid creating new osc at each render
    const dist = useMemo(() => new Tone.Distortion(0).toDestination(), []);
    const reverb = useMemo(() => new Tone.Reverb(1).toDestination(), []);

    // Scale a range of numbers to another range of numbers
    function scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };

    // Start / Stop oscillator
    useEffect(() => {
        audioStatus ?
            (
                osc.start()
                && console.log("Audio Start")
                && dist.start() && reverb.start()
                && osc.chain(dist, reverb, Tone.Destination)
            )
            :
            (
                osc.stop()
                && console.log("Audio Stop")
                && dist.stop()
                && reverb.stop()
            );

    }, [audioStatus, osc, dist, reverb])

    // Change oscillator params whenever rightHandPos changes
    useEffect(() => {
        // Change frequency with y position
        if ((0 < rightHandPos["y"]) && (rightHandPos["y"] < 1)) {   // If within frame
            osc.set({ frequency: scale(1 - rightHandPos["y"], 0, 1, 10, 440) });
        };

        // Change reverb with y position
        if ((0 < leftHandPos["y"]) && (leftHandPos["y"] < 1)) {
            reverb.set({decay: scale(leftHandPos["y"],0,1,0.1,10)});
        };

        // Change volume with right hand openness
        let vol = scale(rightHandOpenness, 120, 180, -30, 0);
        (rightHandOpenness < 120 && (vol = -100));  // If hand closed -> mute
        osc.set({ volume: vol });

        // Change distortion with left hand openness
        let ratio = scale(leftHandOpenness, 120, 180, 0, 1);
        (leftHandOpenness < 120 && (ratio = 0));  // If hand closed -> defunction
        dist.set({ distortion: ratio });

    }, [rightHandPos, leftHandPos, rightHandOpenness, leftHandOpenness, osc, dist, reverb]);

    useEffect(() => {
        osc.set({ type: instrument })
    }, [instrument, osc]);

    // Useful during development to try new effects
    useEffect(() => {

        audioUpdate ?
            (
                osc.set({ type: "triangle" })
            )
            :
            (
                osc.set({ type: "sine" })

            );

    }, [audioUpdate, osc]);
}

export default memo(Tones);