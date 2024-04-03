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
  imageUrl,
  location,
  center,
  instructor,
  attendees,
  spaces,
  active,
  onClick,
  selectedDate,
  reservation,
}) {
  const navigate = useNavigate(); // Hook for navigating to different routes
  const handleRouteChange = () => {
    // Function to handle route change when booking button is clicked
    const path = `/booking`; // Constructing the path for booking page
    navigate(path, { // Navigating to booking page with necessary data
      state: {
        name: name,
        time: time,
        date: selectedDate,
        reservation: reservation,
        imageUrl: imageUrl
      }
    });
  };

  const { t } = useTranslation(); // Hook for using translation functionality

  const classFull = attendees >= spaces;  // Checking if the class is full

  return (
    <div
      onClick={() => onClick?.(id)} // Handling click event, onClick function is optional
      id={id}
      className={`${classFull ? "class-container-full" : "class-container "} ${active ? "active" : ""
        }`} // Applying dynamic class names based on conditions
    >
      <div className="class-details">
        <div>
          <img src={imageUrl} alt={name} style={{alignSelf: "center"}}/>
        </div>
        <div className="class-time">{time}</div>{" "}
        {/* Displaying the time of the class */}
      </div>
      <div className="class-info">
        <div className="class-name">{name}</div>{" "}
        {/* Displaying the name of the class */}
        <div>
          {!classFull && ( // Displaying capacity information only if the class is not full
            <div className="class-location-size">
              {t(resources.label_capacity)}:&nbsp;<span> {attendees}</span>{" "}
              {/* Displaying number of attendees */}
              <span>/</span> {/* Separator */}
              <span>{spaces}</span> {/* Displaying total available spaces */}
            </div>
          )}
          {classFull && ( // Displaying "Class Full" message if the class is full
            <div className="class-location-size">
              <span className="class-full">
                {t(resources.label_class_full)}{" "}
                {/* Displaying translated message for class full */}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="class-info">
        <div>
          <div className="class-room-instructor">
            <span>{room}</span> {/* Displaying the room */}
            <span> • </span> {/* Separator */}
            <span>{instructor}</span> {/* Displaying the instructor */}
          </div>
          <div className="class-location-center">
            {" "}
            {/* Displaying location and center */}
            <span>{center}</span>
            <span> | </span>
            <span>{location}</span>
          </div>
        </div>

      </div>
      {active && // Conditionally rendering book button only if the class is active
        !classFull && (
          <div className="book-button-container">
            <Button onClick={handleRouteChange}>
              {t(resources.button_book_class)}
            </Button>{" "}
            {/* Rendering Button button with booking functionality */}
          </div>
        )}
    </div>
  );
}

export default Activity;