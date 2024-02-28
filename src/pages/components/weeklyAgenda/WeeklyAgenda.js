import React, {useState} from 'react';
import './WeeklyAgenda.css';
import IconFilter from '../icons/IconFilter';
import IconChevronRight from '../icons/IconChevronRight';
import IconChevronLeft from '../icons/IconChevronLeft';

function AgendaItem({ day, date, active, onClick }) {

    return (
    <div
    onClick={onClick}
    className = {`agenda-item ${
        active ? "agenda-item-active" : ""
    } ${
        !active && date.toLocaleString('default', { month: 'numeric', day: 'numeric', year: 'numeric' }) === new Date().toLocaleString('default', { month: 'numeric', day: 'numeric', year: 'numeric' })
        ? "agenda-item-inactive-today"
        : ""
    }`}
    >
        <span className = "agenda-item-day">{day}</span>
        <span className = "agenda-item-month">{date.getDate()}</span>
        </div>
    );
}

  function WeeklyAgenda({ selectedDate, onSelectDate }) {

    // State to keep track of the current month's first day
    const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(new Date());

    // Function to subtract a day
    const subDay = () => {
      const newDate = new Date(currentMonthFirstDay);
      newDate.setDate(newDate.getDate() - 1);

      // Prevent going back past the current date
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if(newDate >= currentDate) {
        setCurrentMonthFirstDay(newDate);
      }
    };

    // Function to add a day
    const addDay = () => {
      const newDate = new Date(currentMonthFirstDay);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentMonthFirstDay(newDate);
    };

    // Function to go to the next month
    const nextMonth = () => {
      const newDate = new Date(currentMonthFirstDay.getFullYear(), currentMonthFirstDay.getMonth() + 1, 1);
      setCurrentMonthFirstDay(newDate);
    };

    // Function to go to the previous month, but not before the current month
    const previousMonth = () => {
      const newDate = new Date(currentMonthFirstDay);
      newDate.setMonth(newDate.getMonth() - 1);
      newDate.setDate(1);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Prevent going back past the current month
      if(newDate.getMonth() < today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
        return;
      }

      // Check if the newDate is in the current month and year
      if(newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
        // If we are navigating back to the current month, set the date to today's date
        setCurrentMonthFirstDay(today);
      } else {
        // Otherwise, just update the month
        setCurrentMonthFirstDay(newDate);
      }
      };

      // Create an array of dates for the week
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentMonthFirstDay);
        date.setDate(currentMonthFirstDay.getDate() + i);
        return date;
      });

      const currentMonth = currentMonthFirstDay.toLocaleString('default', { month: 'long', year: 'numeric'});


    return (
      <div className = "agenda-wrapper">
        <div className = "agenda-header">
        <div className = "agenda-date">
          <span>Date Selected:</span> {selectedDate?.toLocaleString('default', {  weekday: 'long',  day: 'numeric', month: 'long' }) ?? "None"}
        </div>
        <div className = "filters-container">
          <button type = "button" className = "filters-button"><IconFilter />Filters</button>
        </div>
        </div>
        <div className = "agenda-container">
           <div className = "agenda-navigation" onClick = {subDay}><IconChevronLeft /></div>
           {dates.map((date, i) => (
           <AgendaItem
           key = {i}
           day = {date.toLocaleString("en-us", { weekday: "short" })}
           date = {date}
           active = { date.toLocaleString('default', { month: 'numeric', day: 'numeric', year: 'numeric' } ) === selectedDate?.toLocaleString('default', { month: 'numeric', day: 'numeric', year: 'numeric' })}
           onClick = {() => onSelectDate?.(date)}
           />
           ))}
          
  
           <div className = "agenda-navigation" onClick = {addDay}><IconChevronRight /></div>
        </div>
        <div className = "agenda-month">
           <div className = "agenda-month-navigation" onClick = {previousMonth}><IconChevronLeft /></div>
           <div className = "agenda-month-name">{currentMonth}</div>
           <div className = "agenda-month-navigation" onClick = {nextMonth}><IconChevronRight /></div>
        </div>
      </div>
    );
  }

  export default WeeklyAgenda;