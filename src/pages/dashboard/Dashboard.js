import { useState } from "react";
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
  const [selectedClass, handleSetSelectedClass] = useState(undefined);
  const { loading, error, reservations } = useReservations(selectedDate);

  const sections = useAgendaItems(reservations);
  const { t } = useTranslation();

  const handleDateChange = (newDate) => {
    handleSetSelectedDate(newDate);
  };

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
        {loading && (
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
        {error && <div>{t(resources.message_loading_error)}{error.message}</div>}
        {!loading && !error && (
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
                    center={item.center}
                    location={item.location}
                    instructor={item.instructor}
                    time={item.time}
                    attendees={item.attendees}
                    spaces={item.spaces}
                    active={selectedClass === item.id}
                    selectedDate={selectedDate}
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
