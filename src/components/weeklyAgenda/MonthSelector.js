import IconChevronRight from "../icons/IconChevronRight";
import IconChevronLeft from "../icons/IconChevronLeft";

function MonthSelector({
  currentMonth, // Current month to display
  canSelectPreviousMonth, // Function to check if previous month can be selected
  handlePreviousMonth, // Function to handle navigation to the previous month
  handleNextMonth, // Function to handle navigation to the next month
}) {
  return (
    <div className="agenda-month"> {/* Container for month selector */}
      {/* Button to navigate to the previous month */}
      <div
        type="button"
        className={`agenda-month-navigation ${canSelectPreviousMonth() ? "" : "disabled"}`}
        onClick={handlePreviousMonth}
      >
        <IconChevronLeft />
      </div>
      <div className="agenda-month-name">{currentMonth}</div> {/* Displaying the current month */}
      {/* Button to navigate to the next month */}
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
