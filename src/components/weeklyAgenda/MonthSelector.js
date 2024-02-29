import IconChevronRight from '../icons/IconChevronRight';
import IconChevronLeft from '../icons/IconChevronLeft';

function MonthSelector({ currentMonth, onPreviousMonth, onNextMonth }) {

  return (
    <div className="agenda-month">
      <div type="button" className="agenda-month-navigation" onClick={onPreviousMonth}><IconChevronLeft /></div>
      <div className="agenda-month-name">{currentMonth}</div>
      <div type="button" className="agenda-month-navigation" onClick={onNextMonth}><IconChevronRight /></div>
    </div>
  );

}

export default MonthSelector;
