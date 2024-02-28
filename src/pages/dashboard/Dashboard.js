import { useState } from 'react';
import Class from '../components/class/Class';
import Header from '../components/header/Header';
import WeeklyAgenda from '../components/weeklyAgenda/WeeklyAgenda';
import './Dashboard.css';

function useAgendaItems() {

  return [
    {
      header: "Morning - 6:00am to 12:00pm",
      items: Array.from(Array(4).keys()).map((i) => ({
        id: `morning_${i}`,
        name: "Pilates",
        location: "Amsterdam Platnium",
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(undefined);
  const sections = useAgendaItems();

  return (
    <div className = "dashboard-container">
      <WeeklyAgenda
        selectedDate = {selectedDate}
        onSelectDate = {(date) => setSelectedDate(date)}
      />
      <div className = "sections-container">
        {sections.map((item, i) => (
          <div key = {i} className="section">
            <Header>{item.header}</Header>
            {item.items.map((item) => (
              <Class
                key = {item.id}
                {...item}
                active = {selectedClass === item.id}
                selectedDate = {selectedDate}
                onClick = {(id) =>
                  setSelectedClass((state) => (state === id ? undefined : id))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
