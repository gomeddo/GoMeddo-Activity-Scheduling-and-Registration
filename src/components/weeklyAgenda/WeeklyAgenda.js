import React, { useState } from "react";
import "./WeeklyAgenda.css"; // Import the CSS file for styles
import FiltersButton from "./FiltersButton";
import MonthSelector from "./MonthSelector";
import DaySelector from "./DaySelector";

function WeeklyAgenda({ selectedDate, handleDaySelected }) {
  // State to keep track of the current month's first day
  const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(new Date());

  // Function to subtract a day
  const handlePreviousDay = () => {
    const newDate = new Date(currentMonthFirstDay);
    newDate.setDate(newDate.getDate() - 1);

    // Prevent going back past the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (newDate >= currentDate) {
      setCurrentMonthFirstDay(newDate);
    }
  };

  // Function to add a day
  const handleNextDay = () => {
    const newDate = new Date(currentMonthFirstDay);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentMonthFirstDay(newDate);
  };

  // Function to go to the next month
  const handleNextMonth = () => {
    const newDate = new Date(
      currentMonthFirstDay.getFullYear(),
      currentMonthFirstDay.getMonth() + 1,
      1
    );
    setCurrentMonthFirstDay(newDate);
  };

  // Function to go to the previous month, but not before the current month
  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonthFirstDay);
    newDate.setMonth(newDate.getMonth() - 1);
    newDate.setDate(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prevent going back past the current month
    if (
      newDate.getMonth() < today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
      return;
    }

    // Check if the newDate is in the current month and year
    if (
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
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

  const currentMonth = currentMonthFirstDay.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="agenda-wrapper">
      <div className="agenda-header">
        <div className="agenda-date">
          <span>Date Selected:</span>{" "}
          {selectedDate?.toLocaleString("default", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }) ?? "None"}
        </div>
        <FiltersButton />
      </div>
      <DaySelector
        dates={dates}
        selectedDate={selectedDate}
        handleDaySelected={(date) => handleDaySelected?.(date)}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
      />
      <MonthSelector
        currentMonth={currentMonth}
        handlePreviousMonth={handlePreviousMonth}
        handleNextMonth={handleNextMonth}
      />
    </div>
  );
}

export default WeeklyAgenda;
