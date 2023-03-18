import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
 

  let timeStorage = [];
  if (localStorage.getItem('timesArray')) {
    timeStorage = JSON.parse(localStorage.getItem('timesArray'));
  }

  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [savedTimes, setSavedTimes] = useState(timeStorage);

  useEffect(() => {
    if (intervalId) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [intervalId]);

  const startTimer = () => {
    // playSound();

    if (!intervalId) {
      setIntervalId(setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10));
    }
  }

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setSavedTimes(prevSavedTimes => [...prevSavedTimes, time]);

      if (savedTimes && time !== 0) {

        timeStorage.push(time);

        localStorage.setItem('timesArray', JSON.stringify(timeStorage));
      }

    }
  }

  const continueTimer = () => {
    startTimer();
  }

  const resetTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    // setSavedTimes(prevSavedTimes => [...prevSavedTimes, time]); // save time on click
    setTime(0);
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const millis = time % 1000;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millis.toString()}`;
  }

 

  // const playSound = () => {
  //   const audio = new Audio();

  //   const playAudio = () => {
  //     audio.src = './audio/timer.mp3';
  //     audio.loop = true;
  //     audio.play();
  //   }
    
  //   playAudio();
  // }





  return (
    <div className='App container'>
      <h1>{formatTime(time)}</h1>
      <div className='buttons'>
        <>

          {time === 0 &&
            <button className='btn btn-success' onClick={startTimer}>Start</button>
          }
          {savedTimes.length > 0 && time !== 0 &&
            <button className='btn btn-primary' onClick={continueTimer}>Continue</button>
          }
          <button className='btn btn-danger' onClick={stopTimer} >Stop</button>
        </>
        <button className='btn btn-warning' onClick={resetTimer}>Reset</button>

      </div>
      {savedTimes.map(savedTime => (

        <ul className='list-group' key={savedTimes.index}><li className='list-group-item'>{formatTime(savedTime)}</li></ul>
      ))}
    </div>
  );
}

export default App;
