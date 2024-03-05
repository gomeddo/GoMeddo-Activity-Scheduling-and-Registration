import IconChevronRight from "../icons/IconChevronRight";
import IconChevronLeft from "../icons/IconChevronLeft";
import AgendaItem from "./AgendaItem";

function DaySelector({
  handlePreviousDay,
  handleNextDay,
  handleDaySelected,
  dates,
  selectedDate,
}) {
  return (
    <div className="agenda-container">
      <div className="agenda-navigation" onClick={handlePreviousDay}>
        <IconChevronLeft />
      </div>
      {dates?.map((date, i) => (
        <AgendaItem
          key={i}
          day={date.toLocaleString("en-us", { weekday: "short" })}
          date={date}
          active={
            date.toLocaleString("default", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            }) ===
            selectedDate?.toLocaleString("default", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          }
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