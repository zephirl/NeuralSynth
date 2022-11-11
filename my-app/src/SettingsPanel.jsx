import React, { useState } from 'react'

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Progress,
    Col,
    Row,
} from 'reactstrap';

import Tones from './Tones';


// Scale a range of numbers from 0 to 100 for progress bar, not exact as buggy
function normalise(number, settings) {
    const value = (number - settings["inMin"]) * 100 / (settings["inMax"] - settings["inMin"]);
    if (value < 0) {
        return 3;
    } if (value > 100) {
        return 99;
    } else {
        return value;
    };
};

function InstrumentDropdown(props) {
    const { instrument, setInstrument } = props;
    const [instrumentDropdownOpen, setInstrumentDropdownOpen] = useState(false);

    return (
        <Dropdown isOpen={instrumentDropdownOpen} toggle={() => setInstrumentDropdownOpen((prevState) => !prevState)}>
            <DropdownToggle caret>{instrument}</DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => setInstrument("sine")}>sine</DropdownItem>
                <DropdownItem onClick={() => setInstrument("triangle")}>triangle</DropdownItem>
                <DropdownItem onClick={() => setInstrument("square")}>square (warning: hurts ears)</DropdownItem>
                <DropdownItem onClick={() => setInstrument("sawtooth")}>sawtooth (warning: hurts ears)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

function ProgressValue(props) {
    const { value, description } = props;

    return (
        <React.Fragment>
            <div className="m-2">
                <div>{description}</div>
                <Col xs="2">
                    <Progress value={value} style={{ transition: "none" }} />
                </Col>
            </div>
        </React.Fragment>
    )
};


function SettingsPanel(props) {
    const { instrument, setInstrument, audioStatus, setAudioStatus, audioUpdate, setAudioUpdate, rightHandPos, rightHandOpenness, leftHandPos, leftHandOpenness } = props;

    // Settings for each parameters, can be extended
    const audioSettingsRightHandY = { parameter: "frequency", inMin: 0, inMax: 1, outMin: 10, outMax: 600 }; // Frequency
    const audioSettingsRightHandOpenness = { parameter: "volume", inMin: 120, inMax: 180, outMin: -30, outMax: 0 }; // Volume (dB)

    return (
        <React.Fragment>
            <h6 className="m-2">Body Tracking information: </h6>
            <div className="m-2">Right hand x: {rightHandPos["x"]}</div>
            <div className="m-2">Right hand y: {rightHandPos["y"]}</div>
            <div className="m-2">Right hand average joint angle: {rightHandOpenness.toPrecision(12)}</div>
            <div className="m-2">Left hand x: {leftHandPos["x"]}</div>
            <div className="m-2">Left hand y: {leftHandPos["y"]}</div>
            <div className="m-2">Left hand average joint angle: {leftHandOpenness.toPrecision(12)}</div>

            <h6 className="m-2 mt-4">Musical parameters: </h6>
            <ProgressValue className="m-2" value={(1 - rightHandPos["y"]) * 100} description="Frequency" />
            <ProgressValue value={normalise(rightHandOpenness, audioSettingsRightHandOpenness)} description="Volume" />

            <Row className="m-2 mt-3">
                <Col xs="1">
                    <div>Audio status:</div>
                    <Button className="mt-1" onClick={() => setAudioStatus(!audioStatus)}>{audioStatus ? 'On' : 'Off'} </Button>

                </Col>
                <Col xs="2">
                    <div className="mb-1">Instrument (oscillator type):</div>
                    <InstrumentDropdown instrument={instrument} setInstrument={setInstrument} />
                </Col>
                {/* <Button className="m-2" onClick={() => setAudioUpdate(!audioUpdate)}> audioUpdate: {audioUpdate ? 'On' : 'Off'} </Button> */}
            </Row>
            <Tones audioSettingsRightHandY={audioSettingsRightHandY} rightHandPos={rightHandPos} rightHandOpenness={rightHandOpenness} leftHandPos={leftHandPos} leftHandOpenness={leftHandOpenness} audioStatus={audioStatus} instrument={instrument} audioUpdate={audioUpdate} />
        </React.Fragment>
    );
};

export default SettingsPanel;