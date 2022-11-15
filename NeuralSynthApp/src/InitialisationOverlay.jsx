import React, { useEffect } from 'react'
import Overlay from "react-overlay-component";
import { Button } from 'reactstrap';

function InitilisationOverlay(props) {
    const { initialising, isOverlayOpen, setOverlay } = props;

    function closeOverlay() { setOverlay(false) };

    const overlayConfigs = {
        animate: true,
    };

    // The page needs to fully renders before showing the overlay.
    // This ensures the overlay opens after rendering the page.
    useEffect(() => {
        setOverlay(true);
    }, [setOverlay]);

    return (
        <div>
            <Overlay configs={overlayConfigs} isOpen={isOverlayOpen}>
                <h2 className="mt-1">Welcome to NeuralSynth!  </h2>
                <p>We believe music is fundamental in our lives,
                    to let us express our creativity, let go of tension and stress we might be feeling,
                    and reconnect with ourselves and others.</p>
                <p>Thus, we created NeuralSynth, for anyone to start creating music, even without any experience or instrument.
                    NeuralSynth works with a computer vision model capable of tracking your body movements and
                    mapping them to different audio parameters to let you create music with your body.</p>
                <h4 className="mt-1">Instructions:  </h4>
                <p>To create music, stand at least 1 meter away from your webcam and:</p>
                <ul>
                    <li>You need to turn on the audio with the button provided</li>
                    <li>Move your right hand up and down to control the pitch</li>
                    <li>Open and close your right hand to control the volume</li>
                </ul>
                <p className="mt-4">Note: Please use Google Chrome for the best experience. Other browsers will either not work or be slower. </p>
                {initialising && <p><em>Note 2: You can only close this pop-up once the app has loaded. If more than a minute has passed, please refresh the page.</em></p>}
                <div className="text-center mt-4">
                    <Button
                        onClick={() => closeOverlay()}
                        disabled={initialising}>
                        {initialising ? "Loading..." : "Close"}
                    </Button>
                </div>
            </Overlay>
        </div>
    );
};

export default InitilisationOverlay;