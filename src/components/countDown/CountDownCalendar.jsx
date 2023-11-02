import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./CountDownCalendar.css";

const CountdownCalendar = ({ onExpiry, disabled }) => {
  const [startDate, setStartDate] = useState(() => {
    const storedStartDate = localStorage.getItem("startDate");
    return storedStartDate ? new Date(storedStartDate) : new Date();
  });
  const [endDate, setEndDate] = useState(() => {
    const storedEndDate = localStorage.getItem("endDate");
    return storedEndDate ? new Date(storedEndDate) : new Date();
  });
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isRunning, setIsRunning] = useState(
    localStorage.getItem("isRunning") === "true" || false
  );

  const [shouldStartTimer, setShouldStartTimer] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      // Check if the current time is equal to or greater than the start date
      const now = moment();
      const startDateTime = moment(startDate);
      if (now >= startDateTime) {
        setIsRunning(true);
        localStorage.setItem("isRunning", "true");
        // timerStartedCallback();
      }
    }
  }, [startDate, isRunning]);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        const now = moment();
        const diff = moment(endDate).diff(now);

        if (diff <= 0) {
          setIsRunning(false);
          onExpiry(); // Call the callback function on timer expiry
        } else {
          const duration = moment.duration(diff);
          setTimeRemaining({
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
          });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, endDate, onExpiry]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    updateEndDate(date);
    setShouldStartTimer(false);
  };

  const updateEndDate = (startDate) => {
    const newEndDate = moment(startDate).add(1, "day").toDate();
    setEndDate(newEndDate);
  };

  const startTimer = () => {
    setIsRunning(true);
    localStorage.setItem("isRunning", "true");
  };

  const stopTimer = () => {
    setIsRunning(false);
    localStorage.setItem("isRunning", "false");
  };

  useEffect(() => {
    localStorage.setItem("startDate", startDate.toISOString());
    localStorage.setItem("endDate", endDate.toISOString());
  }, [startDate, endDate]);

  return (
    <div className="countdownCalendar-container">
      <div className="countdownCalendar-input">
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MM/dd/yyyy"
          />
          <span className="date-separator">to</span>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        {/* <button
          className="calendarStart-button"
          onClick={startTimer}
          disabled={isRunning || disabled || !shouldStartTimer}
        >
          Start
        </button> */}
        <button
          className="calendarStop-button"
          onClick={stopTimer}
          disabled={!isRunning || disabled}
        >
          Stop
        </button>
      </div>
      <div className="countdownCalendar-display">
        {isRunning ? (
          <div className="countdownCalendar-text">
            {timeRemaining.days} days {timeRemaining.hours} hours{" "}
            {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds
            remaining
          </div>
        ) : (
          <div className="countdownCalendar-text">Election Over</div>
        )}
      </div>
    </div>
  );
};

export default CountdownCalendar;
