import { useState, useEffect } from "react";
import { useMapView } from "../../providers/MapViewContext";
import Activity from "../../components/activity/Activity";
import Header from "../../components/header/Header";
import WeeklyAgenda from "../../components/weeklyAgenda/WeeklyAgenda";
import useGoMeddo from "../../hooks/useGoMeddo";
import "./Dashboard.css";

function useAgendaItems(reservations) {
  const categorizeByTimeOfDay = (reservation) => {
    const startTime = new Date(
      reservation.customProperties.get("B25__Start_Local_DateTime__c")
    ).getHours();
    if (startTime >= 6 && startTime < 12) return "Morning";
    if (startTime >= 12 && startTime < 18) return "Afternoon";
    if (startTime >= 18 && startTime <= 23) return "Evening";
    return "Other";
  };

  const formatName = (name) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName} ${lastName[0]}.`;
  };

  const sections = reservations.reduce((acc, reservation) => {
    const timeOfDay = categorizeByTimeOfDay(reservation);
    if (!acc[timeOfDay]) {
      acc[timeOfDay] = {
        header: `${timeOfDay} - ${timeOfDay === "Morning"
            ? "6:00am to 12:00pm"
            : timeOfDay === "Afternoon"
              ? "12:00pm to 6:00pm"
              : "6:00pm to 9:00pm"
          }`,
        items: [],
      };
    }
    acc[timeOfDay].items.push({
      id: reservation.id,
      name: reservation.customProperties.get("B25__Title__c"),
      room: reservation.customProperties.get("Room_Name__c"),
      instructor: formatName(reservation.customProperties.get("Staff_Name__c")),
      time: `${new Date(
        reservation.customProperties.get("B25__Start_Local_DateTime__c")
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${new Date(
        reservation.customProperties.get("B25__End_Local_DateTime__c")
      ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
      attendees: reservation.customProperties.get("Room_Capacity__c"),
      spaces: reservation.customProperties.get("B25LP__Capacity__c"),
    });
    return acc;
  }, {});

  // Return sections in the desired order
  return ["Morning", "Afternoon", "Evening"]
    .map((timeOfDay) => sections[timeOfDay])
    .filter(Boolean);
}

function Dashboard() {
  const { isMapView } = useMapView();
  const [selectedDate, handleSetSelectedDate] = useState(new Date());
  const [selectedClass, handleSetSelectedClass] = useState(undefined);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gm = useGoMeddo(); // Custom hook to use GoMeddo SDK functionality

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // set loading state to true when fetching data
      try {
        //Fetch data logic using GoMeddo SDK and use this data to update the component state
        const reservationResult = await gm
          .buildReservationRequest()
          .withStatus("Definite")
          .includeAdditionalFields([
            "B25__Title__c",
            "B25__Start_Local_DateTime__c",
            "B25__End_Local_DateTime__c",
            "Staff_Name__c",
            "Room_Name__c",
            "Room_Capacity__c",
            "B25LP__Capacity__c",
            "City_Location__c",
            "Center_Name__c",
            "",
          ])
          .getResults();

        const filteredReservations = reservationResult
          .getReservations()
          .filter((reservation) => {
            const startDate = new Date(
              reservation.customProperties.get("B25__Start_Local_DateTime__c")
            );
            return startDate.toDateString() === selectedDate.toDateString();
          });

        // Fetch resources here
        const resources = await gm
          .buildResourceRequest()
          .includeAllResourcesAt("a0Zao0000002xC6EAI")
          .withType("a0Yao00000059NiEAI")
          .getResults();

        // Log resources to console
        console.log("Resources:", resources);

        setReservations(filteredReservations);
        setError(null);
      } catch (error) {
        // Error handling
        setError(error);
        setReservations([]);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate a delay in the loading state
      }
    };

    fetchData();
  }, [selectedDate, gm]);

  const sections = useAgendaItems(reservations);

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
        {error && <div>Error loading class schedule: {error.message}</div>}
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
