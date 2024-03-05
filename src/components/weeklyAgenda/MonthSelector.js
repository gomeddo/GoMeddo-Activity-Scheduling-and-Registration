import IconChevronRight from "../icons/IconChevronRight";
import IconChevronLeft from "../icons/IconChevronLeft";

function MonthSelector({ currentMonth, handlePreviousMonth, handleNextMonth }) {
  return (
    <div className="agenda-month">
      <div
        type="button"
        className="agenda-month-navigation"
        onClick={handlePreviousMonth}
      >
        <IconChevronLeft />
      </div>
      <div className="agenda-month-name">{currentMonth}</div>
      <div
        type="button"
        className="agenda-month-navigation"
        onClick={handleNextMonth}
      >
        <IconChevronRight />
      </div>
    </div>
  );
}

export default MonthSelector;
