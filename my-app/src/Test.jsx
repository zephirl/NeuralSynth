import React, { useRef, useEffect, useState } from 'react'

function Test() {
    const [bodyTrack, setBodyTrack] = useState(0);

    function TestLoop() {
        // while (true) {
            setBodyTrack(bodyTrack + 1);
        // };
    }

    TestLoop();

    return (
        <div>b{bodyTrack}</div>
    );
}

export default Test;