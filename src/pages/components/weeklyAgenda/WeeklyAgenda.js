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
        !active && date === new Date().getDate()
        ? "agenda-item-inactive-today"
        : ""
    }`}
    >
        <span className = "agenda-item-day">{day}</span>
        <span className = "agenda-item-month">{date}</span>
        </div>
    );
}

  function WeeklyAgenda({ selectedDate, onSelectDate }) {
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
           <div className = "agenda-navigation"><IconChevronLeft /></div>
          {Array.from(Array(7).keys()).map((i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
  
            return (
              <AgendaItem
                key = {i}
                day = {date.toLocaleString("en-us", { weekday: "short" })}
                date = {date.getDate()}
                active = { date.getDate() === selectedDate?.getDate()}
                onClick = {() => onSelectDate?.(date)}
              />
            );
          })}
  
           <div className = "agenda-navigation"><IconChevronRight /></div>
        </div>
        <div className = "agenda-month">
           <div className = "agenda-month-navigation"><IconChevronLeft /></div>
           <div className = "agenda-month-name">{selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric' }) ?? "None"}</div>
           <div className = "agenda-month-navigation"><IconChevronRight /></div>
        </div>
      </div>
    );
  }

  export default WeeklyAgenda;