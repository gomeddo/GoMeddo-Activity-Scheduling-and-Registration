import { formatDate } from "./utils";

/* This component represents an item in the agenda and takes in information
such as the day, date, whether it's active, and a function to handle click events. */
function AgendaItem({ day, date, active, onClick }) {
  return (
    // The div represents the agenda item. It has a click event handler, and its CSS classes are  determined based on its state.
    <div
      onClick={onClick} // When the agenda item is clicked, the provided onClick function is called.
      className={`agenda-item ${active ? "agenda-item-active" : ""} ${
        /* The classNames are conditional based on the state of the agenda item.
        If the item is active, it gets an "agenda-item-active" class. */
        !active && formatDate(date) === formatDate(new Date())
          ? "agenda-item-inactive-today"
          : ""
        // If the item is not active and its date matches today's date, it gets an "agenda-item-inactive-today" class.
        }`}
    >
      {/* Spans to display the day and month. */}
      <span className="agenda-item-day">{day}</span>
      <span className="agenda-item-month">{date.getDate()}</span>
    </div>
  );
}

export default AgendaItem;
