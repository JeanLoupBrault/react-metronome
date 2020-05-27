import React, { useState, useEffect } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


function Metronome(props) {
    // useEffect(() => {
    const [playing, setPlaying] = useState([]);
    const [bpm, setBpm] = useState([]);
    const [soundClick1, setSoundClick1] = useState([]);
    const [soundClick2, setSoundClick2] = useState([]);
    const [timer, setTimer] = useState([]);
    const [interval, setInterval] = useState([]);


    let count = 0;
    // let timer = 0;

    function handleBpmChange(event) {
        const bpm = event.target.value;
        setBpm(bpm);
        if (playing) {
            // stop the old timer and start a new one
            clearInterval();
            let timer = setInterval(playClick(), (60 / bpm) * 1000);


            // set the new bpm, and reset the beat counter
            count = 0;
            setBpm(bpm);
        } else {
            setBpm(bpm);
        }
    };

    function playClick() {
        // the first beat will have a different sound than the others
        if (count % bpm === 0) {
            setSoundClick2(soundClick1);
        } else {
            setSoundClick1(soundClick2);
        }

        // keep track of wich beat we're on
        setBpm((count + 1) % setBpm)
    }

    function startStop() {
        if (playing) {
            // stop the timer
            clearInterval(timer);
            setPlaying(false);
        } else {
            // start a timer with the current BPM
            setTimer(playing)
            setInterval(60 / setBpm * 1000);
            count = 0;
            playClick(click2);
        }
        playClick(click1);
    }
    // }, []);

    return (

        <div className='metronome'>
            <div className='bpm-slider'>
                <div>{bpm} BPM</div>
                <input type='range'
                    min='60'
                    max='240'
                    value={bpm}
                    onChange={handleBpmChange} />
            </div>
            <button onClick={startStop}>
                {playing ? 'Stop' : 'Start'}
            </button>
        </div>

    );

}


export default Metronome;
