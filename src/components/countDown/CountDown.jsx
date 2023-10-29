import React, { useState, useEffect } from "react";
import "./CountDown.css";

const CountdownTimer = ({ onExpiry }) => {
  const [initialTime, setInitialTime] = useState(
    parseInt(localStorage.getItem("initialTime")) || 60
  );
  const [time, setTime] = useState(
    parseInt(localStorage.getItem("time")) || 60
  );
  const [isRunning, setIsRunning] = useState(
    localStorage.getItem("isRunning") === "true" || false
  );

  useEffect(() => {
    if (isRunning && time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            localStorage.setItem("isRunning", "false");
            onExpiry(); // Call the callback function on timer expiry
          }
          localStorage.setItem("time", prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, time, onExpiry]);

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setInitialTime(newTime);
    setTime(newTime);
    localStorage.setItem("initialTime", newTime);
    localStorage.setItem("time", newTime);
  };

  const startTimer = () => {
    setIsRunning(true);
    localStorage.setItem("isRunning", "true");
  };

  const stopTimer = () => {
    setIsRunning(false);
    localStorage.setItem("isRunning", "false");
  };

  return (
    <div className="countdown-container">
      <div className="countdown-input">
        <input
          type="number"
          value={initialTime}
          onChange={handleTimeChange}
          disabled={isRunning}
        />
        <button
          className="start-button"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="stop-button"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>
      <div className="countdown-display">
        {isRunning ? (
          <div className="countdown-text">{time} seconds remaining</div>
        ) : (
          <div className="countdown-text">Timer stopped</div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
