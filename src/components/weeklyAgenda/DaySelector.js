import IconChevronRight from "../icons/IconChevronRight";
import IconChevronLeft from "../icons/IconChevronLeft";
import AgendaItem from "./AgendaItem";
import { formatDate } from "./utils";

function DaySelector({
  handlePreviousDay,
  handleNextDay,
  handleDaySelected,
  dates,
  selectedDate,
  canSelectPreviousDay,
}) {
  return (
    <div className="agenda-container">
      <div
        className={`agenda-navigation ${
          canSelectPreviousDay() ? "" : "disabled"
        }`}
        onClick={handlePreviousDay}
      >
        <IconChevronLeft />
      </div>
      {dates?.map((date, i) => (
        <AgendaItem
          key={i}
          day={date.toLocaleString("en-us", { weekday: "short" })}
          date={date}
          // Checking if the current date is the selected date
          active={formatDate(date) === formatDate(selectedDate)}
          onClick={() => handleDaySelected(date)}
        />
      ))}
      <div className="agenda-navigation" onClick={handleNextDay}>
        <IconChevronRight />
      </div>
    </div>
  );
}

export default DaySelector;
