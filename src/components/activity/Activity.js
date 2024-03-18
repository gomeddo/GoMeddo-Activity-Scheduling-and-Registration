import React from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import "./Activity.css";
import { useTranslation } from "react-i18next";
import resources from "../../i18n/resources";

function Activity({
  id,
  name,
  time,
  room,
  location,
  center,
  staff,
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

  const { t } = useTranslation();

  const classFull = attendees === spaces;
  return (
    <div
      onClick={() => onClick?.(id)}
      id={id}
      className={`${classFull ? "class-container-full" : "class-container "} ${active ? "active" : ""
        }`}
    >
      <div className="class-info">
        <div className="class-details">
          <div className="class-name">{name}</div>
          <div className="class-location-instructor">
            <span>{room}</span>
            <span> • </span>
            <span>{instructor}</span>
          </div>
          <div className="class-location-center">{location},{center}</div>
          {!classFull && (
            <div className="class-location-size">
              {t(resources.label_capacity)}:&nbsp;<span> {attendees}</span>
              <span>/</span>
              <span>{spaces}</span>
            </div>
          )}
          {classFull && (
            <div className="class-location-size">
              <span className="class-full">
                {t(resources.label_class_full)}
              </span>
            </div>
          )}
        </div>
        <div className="class-time">{time}</div>
      </div>
      {active &&
        !classFull && ( // Conditionally render the book button if the class is active
          <div className="book-button-container">
            <Button onClick={handleRouteChange}>{t(resources.button_book_class)}</Button>
          </div>
        )}
    </div>
  );
}

export default Activity;