import { useState, useEffect } from "react";
import { useMapView } from "../../providers/MapViewContext";
import Activity from "../../components/activity/Activity";
import Header from "../../components/header/Header";
import WeeklyAgenda from "../../components/weeklyAgenda/WeeklyAgenda";
import useGoMeddo from "../../hooks/useGoMeddo";
import "./Dashboard.css";

// Custom hook to simulate fetching agenda items
function useAgendaItems() {
  // Returns a structured list of agenda items divided into time sections
  return [
    {
      header: "Morning - 6:00am to 12:00pm",
      items: Array.from(Array(4).keys()).map((i) => ({
        id: `morning_${i}`,
        name: "Pilates",
        location: "Amsterdam Platinum",
        instructor: "Paul M",
        time: "6:15 am - 7:00 am",
        attendees: 15,
        spaces: 15,
      })),
    },
    {
      header: "Afternoon - 12:00pm to 6:00pm",
      items: Array.from(Array(10).keys()).map((i) => ({
        id: `afternoon_${i}`,
        name: "Hot Yoga B",
        location: "Amsterdam Gold",
        instructor: "Jim G",
        time: "1:15 pm - 2:00 pm",
        attendees: 5,
        spaces: 10,
      })),
    },
    {
      header: "Evening - 6:00pm to 9:00pm",
      items: Array.from(Array(6).keys()).map((i) => ({
        id: `evening_${i}`,
        name: "Hot Yoga C",
        location: "Amsterdam Gold",
        instructor: "Elliot M",
        time: "6:15 pm - 7:00 pm",
        attendees: 2,
        spaces: 18,
      })),
    },
  ];
}

function Dashboard() {
  const { isMapView } = useMapView();
  const [selectedDate, handleSetSelectedDate] = useState(new Date());
  const [selectedClass, handleSetSelectedClass] = useState(undefined);
  const sections = useAgendaItems();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState(null);

  const gm = useGoMeddo(); // Custom hook to use GoMeddo SDK functionality

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // set loading state to true when fetching data
      try {
        //Fetch data logic using GoMeddo SDK and use this data to update the component state
        let reservations = await gm.buildReservationRequest()
          .withStatus("Definite") // Definite
          .getResults();
        setReservations(reservations);
        console.log(reservations.getReservations());
        setError(null);
      } catch (error) {
        // Error handling
        setError(error);
        setReservations(null);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate a delay in the loading state
      }
    };


    fetchData();
  }, [selectedDate, gm, data]);

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
            Loading class schedule for{" "}
            {selectedDate?.toLocaleString("default", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            ...
            <div className="dashboard-loading-spinner"></div>
          </div>
        )}
        {error && <div>Error loading class schedule: {error.message}</div>}
        {!loading && !error && (
          <div
            className={
              isMapView ? "sections-container-stacked" : "sections-container"
            }
          >
            {sections.map((item, i) => (
              <div
                key={i}
                className={isMapView ? "section-stacked" : "section"}
              >
                {/* Section header (e.g., "Morning - 6:00am to 12:00pm") */}
                <Header>{item.header}</Header>
                {/* List of classes within the section */}
                {/* HERE IS WHERE THE AVAILABLE CLASSES (RESERVATIONS) WE GOT ARE PUT INTO THE PAGE */}
                {reservations && reservations.getReservations().map((reservation) => (
                  <h1 key={reservation.id}>{reservation.id}</h1>
                ))}
                {item.items.map((item) => (
                  <Activity
                    key={item.id} // Added key prop for item mapping
                    {...item}
                    active={selectedClass === item.id}
                    selectedDate={selectedDate}
                    onClick={(id) =>
                      handleSetSelectedClass((state) =>
                        state === id ? undefined : id,
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