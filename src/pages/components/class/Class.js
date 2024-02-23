import React from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import './Class.css';


function Class({ id, name, time, location, instructor, active, onClick, selectedDate }) {
  
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/booking`;
    navigate(path, { state: { name: name, time: time, date: selectedDate } });
  }

  return (
    <div
      onClick = {() => onClick?.(id)}
      id={id}
      className = {`class-container ${active ? 'active' : ''}`}
    >
      <div className = "class-info">
        <div className = "class-details">
          <div className = "class-name">{name}</div>
          <div className = "class-location-instructor">
            <span>{location}</span>
            <span> • </span>
            <span>{instructor}</span>
          </div>
        </div>
        <div className = "class-time">{time}</div>
      </div>
      {active && (
        <div className = "book-button-container">
          <Button onClick = {routeChange}>Book Class</Button>
        </div>
      )}
    </div>
  );
}

export default Class;
