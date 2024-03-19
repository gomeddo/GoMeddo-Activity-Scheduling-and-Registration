import IconChevronRight from "../icons/IconChevronRight";
import IconChevronLeft from "../icons/IconChevronLeft";
import AgendaItem from "./AgendaItem";
import { formatDate } from "./utils";

function DaySelector({
  handlePreviousDay, // Function to handle navigation to the previous day
  handleNextDay, // Function to handle navigation to the next day
  handleDaySelected, // Function to handle selection of a day
  dates, // Array of dates to display in the day selector
  selectedDate, // Currently selected date
  canSelectPreviousDay, // Function to check if the previous day can be selected
}) {
  return (
    <div className="agenda-container"> {/* Container for the day selector */}
      {/* Button to navigate to the previous day */}
      <div
        className={`agenda-navigation ${canSelectPreviousDay() ? "" : "disabled"}`}
        onClick={handlePreviousDay}
      >
        <IconChevronLeft />
      </div>
      {/* Mapping through dates to render AgendaItem components */}
      {dates?.map((date, i) => (
        <AgendaItem
          key={i} // Unique key for each AgendaItem
          day={date.toLocaleString("en-us", { weekday: "short" })}
          date={date}
          // Checking if the current date is the selected date
          active={formatDate(date) === formatDate(selectedDate)}
          onClick={() => handleDaySelected(date)}
        />
      ))}
      {/* Button to navigate to the next day */}
      <div className="agenda-navigation" onClick={handleNextDay}>
        <IconChevronRight />
      </div>
    </div>
  );
}

export default DaySelector;