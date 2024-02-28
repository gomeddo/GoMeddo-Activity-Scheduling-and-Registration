function AgendaItem({ day, date, active, onClick }) {

    return (
      <div
        onClick = {onClick}
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
  
  export default AgendaItem;
  