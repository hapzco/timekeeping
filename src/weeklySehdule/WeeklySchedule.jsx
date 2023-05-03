import React, { useState } from 'react';
import moment from 'moment-timezone';
import './weekly.css';

const WeeklySchedule = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const workingHours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

  const [currentWeek, setCurrentWeek] = useState(moment.tz(new Date(), 'UTC-0'));
  const [timezone, setTimezone] = useState('UTC-0');
  const [selectedHours, setSelectedHours] = useState([]);

  const previousWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, 'week'));
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, 'week'));
  };

const handleTimezoneChange = (event) => {
  const newTimezone = event.target.value;
  setTimezone(newTimezone);
  setCurrentWeek(moment.tz(new Date(), newTimezone));

  setSelectedHours((prevSelectedHours) => {
    const selected = prevSelectedHours.map((hour) => {
      const [day, time] = hour.split('-');
      const newTime = moment.tz(`${day} ${time}`, 'ddd hA', 'UTC-0').tz(newTimezone).format('ddd-hA');
      return newTime;
    });
    return selected;
  });
};

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedHours((prevSelectedHours) => {
      if (prevSelectedHours.includes(value)) {
        return prevSelectedHours.filter((hour) => hour !== value);
      } else {
        return [...prevSelectedHours, value];
      }
    });
  };

  const formattedDate = `${currentWeek.format('MMMM D, YYYY')} (${currentWeek.zoneAbbr()})`;

  return (
    <div className="weekly-schedule">
      <h1>Weekly Schedule</h1>
      <div className="week-header">
        <button onClick={previousWeek}>Previous</button>
        <span>{formattedDate}</span>
        <button onClick={nextWeek}>Next</button>
      </div>
      <div>
        <label htmlFor="timezone">Timezone:</label>
        <select id="timezone" value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC-0">UTC-0</option>
          <option value="UTC-5">UTC-5</option>
        </select>
      </div>
      <div className="working-hours">
        {weekDays.map((day) => (
          <div key={day} className="day-row">
            <span>{day}</span>
            {workingHours.map((hour) => (
              <label key={hour} className="hour-label">
                <input
                  type="checkbox"
                  value={`${day}-${hour}`}
                  checked={selectedHours.includes(`${day}-${hour}`)}
                  onChange={handleCheckboxChange}
                />
                {hour}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
