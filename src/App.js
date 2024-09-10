import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handleIncrement = (type) => {
    if (type === 'break' && breakLength < 60) {
      setBreakLength(breakLength + 1);
    } else if (type === 'session' && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isSession) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleDecrement = (type) => {
    if (type === 'break' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    } else if (type === 'session' && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isSession) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = document.getElementById('beep');
      audio.play();

      if (isSession) {
        setTimeLeft(breakLength * 60);
        setIsSession(false);
      } else {
        setTimeLeft(sessionLength * 60);
        setIsSession(true);
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div>
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={() => handleDecrement('break')}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleIncrement('break')}>+</button>
        </div>
        <div>
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={() => handleDecrement('session')}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleIncrement('session')}>+</button>
        </div>
      </div>

      <div className="timer">
        <h2 id="timer-label">{isSession ? 'Session' : 'Break'}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>

      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>

      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav"></audio>
    </div>
  );
}

export default App;

//Test 
