import React, { useState } from "react";
import "./WeeklyAgenda.css"; // Import the CSS file for styles
import FiltersButton from "./FiltersButton";
import MonthSelector from "./MonthSelector";
import DaySelector from "./DaySelector";
// Import custom hooks and utility functions
import {
  usePreviousDay,
  useNextDay,
  useNextMonth,
  usePreviousMonth,
  useCanSelectPreviousDay,
  useCanSelectPreviousMonth,
  useCurrentWeekDate,
} from "./hooks";
import { formatLongDate, formatMonth } from "./utils";

// WeeklyAgenda component definition
function WeeklyAgenda({ selectedDate, handleDaySelected }) {
  // State to keep track of the current month's first day
  const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(new Date());

  // Functions to handle navigation between days and months
  const handlePreviousDay = usePreviousDay(setCurrentMonthFirstDay);
  const handleNextDay = useNextDay(setCurrentMonthFirstDay);
  const handleNextMonth = useNextMonth(setCurrentMonthFirstDay);
  const handlePreviousMonth = usePreviousMonth(setCurrentMonthFirstDay);

  // Check if it's possible to select the previous day and month
  const canSelectPreviousDay = useCanSelectPreviousDay(currentMonthFirstDay);
  const canSelectPreviousMonth =
    useCanSelectPreviousMonth(currentMonthFirstDay);

  // Generate an array of dates representing the current week
  const dates = useCurrentWeekDate(currentMonthFirstDay);

  // Format the selected month for display
  const formattedSelectedMonth = formatMonth(currentMonthFirstDay);

  // Format the selected date for display
  const formattedSelectedDate = formatLongDate(selectedDate) ?? "None";

  // Render the WeeklyAgenda component
  return (
    <div className="agenda-wrapper">
      {/* Render the header section */}
      <div className="agenda-header">
        {/* Display the selected date */}
        <div className="agenda-date">
          <span>Date Selected:</span> {formattedSelectedDate}
        </div>
        {/* Render the filters button */}
        <FiltersButton />
      </div>
      {/* Render the DaySelector component */}
      <DaySelector
        dates={dates}
        selectedDate={selectedDate}
        canSelectPreviousDay={canSelectPreviousDay}
        handleDaySelected={(date) => handleDaySelected?.(date)}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
      />
      {/* Render the MonthSelector component */}
      <MonthSelector
        currentMonth={formattedSelectedMonth}
        canSelectPreviousMonth={canSelectPreviousMonth}
        handlePreviousMonth={handlePreviousMonth}
        handleNextMonth={handleNextMonth}
      />
    </div>
  );
}

export default WeeklyAgenda;
