import { useState, useEffect } from "react";
import { useMapView } from "../../providers/MapViewContext";
import Activity from "../../components/activity/Activity";
import Header from "../../components/header/Header";
import WeeklyAgenda from "../../components/weeklyAgenda/WeeklyAgenda";
import "./Dashboard.css";
import { useReservations, useAgendaItems } from "./hooks";
import resources from "../../i18n/resources";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { isMapView } = useMapView();
  const [selectedDate, handleSetSelectedDate] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedClass, handleSetSelectedClass] = useState(undefined);
  const { loading, error, reservations } = useReservations(selectedDate);

  const sections = useAgendaItems(reservations);
  const { t } = useTranslation();
  const handleDateChange = (newDate) => {
    handleSetSelectedDate(newDate);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && sections.length === 0) {
      const timeoutId = setTimeout(() => setShowError(true), 5000); // Set timeout for 10 seconds
      return () => clearTimeout(timeoutId); // Cleanup function to clear timeout on unmount
    }
  }, [loading, sections, error]);

  return (
    <div className="dashboard-wrapper">
      {/* Optional map view, displayed only if isMapView is true */}
      {isMapView && <div className="dashboard-map" />}
      <div className="dashboard-container">
        {/* Weekly agenda selector */}
        <WeeklyAgenda
          selectedDate={selectedDate}
          handleDaySelected={handleDateChange} // Update the agenda based on the selected date
        />
        {/* Container for each time section (Morning, Afternoon, Evening) */}
        {((loading && sections.length === 0) || error) && !showError && (
          <div className="dashboard-loading">
            {t(resources.message_loading)}{" "}
            {selectedDate.toLocaleString("default", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            ...
            <div className="dashboard-loading-spinner"></div>
          </div>
        )}
        {!loading && sections.length === 0 && showError && (
          <div>{errorMessage ? `${errorMessage} Please try again later or check the console for more details.` : ''}</div>
        )}
        {!loading && sections.length > 0 && (
          <div
            className={
              isMapView ? "sections-container-stacked" : "sections-container"
            }
          >
            {sections.map((section, index) => (
              <div
                key={index}
                className={isMapView ? "section-stacked" : "section"}
              >
                <Header>{section.header}</Header>
                {section.items.map((item) => (
                  <Activity
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    room={item.room}
                    imageUrl={item.imageUrl}
                    center={item.center}
                    location={item.location}
                    instructor={item.instructor}
                    time={item.time}
                    attendees={item.attendees}
                    spaces={item.spaces}
                    active={selectedClass === item.id}
                    selectedDate={selectedDate}
                    reservation={item.reservation}
                    onClick={(id) =>
                      handleSetSelectedClass((state) =>
                        state === id ? undefined : id
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;