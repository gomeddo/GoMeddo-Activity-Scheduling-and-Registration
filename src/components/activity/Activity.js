import React from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import './Activity.css';


function Activity({
  id,
  name,
  time,
  location,
  instructor,
  attendees,
  spaces,
  active,
  onClick,
  selectedDate,
}) {
  const navigate = useNavigate();
  const handleRouteChange = () => {
    const path = `/booking`;
    navigate(path, { state: { name: name, time: time, date: selectedDate } });
  };

  const classFull = attendees === spaces;
  return (
    <div
      onClick={() => onClick?.(id)}
      id={id}
      className={`${classFull ? 'class-container-full' : 'class-container '} ${active ? 'active' : ''}`}
    >
      <div className="class-info">
        <div className="class-details">
          <div className="class-name">{name}</div>
          <div className="class-location-instructor">
            <span>{location}</span>
            <span> • </span>
            <span>{instructor}</span>
          </div>
          {!classFull && (
            <div className="class-location-size">
              Capacity:&nbsp;<span> {attendees}</span>
              <span>/</span>
              <span>{spaces}</span>
            </div>)
          }
          {classFull && (
            <div className="class-location-size">
              <span className="class-full">Class Full</span>
            </div>)
          }
        </div>
        <div className="class-time">{time}</div>
      </div>
      {active &&
        !classFull && ( // Conditionally render the book button if the class is active
          <div className="book-button-container">
            <Button onClick={handleRouteChange}>Book Class</Button>
          </div>
        )}
    </div>
  );
}

export default Activity;