import React, { useEffect } from 'react';
import moment from 'moment';
import { LeftAngle, RightAngle } from '../svg';
import './MonthBox.css';
import Weeks from '../components/Weeks';

const MonthBox = ({
  monthLabel,
  yearLabel,
  daysShort,
  prevMonth,
  nextMonth,
  weeks,
  currentMonthView: month,
  onDateClick,
  selectedDate,
  range = false,
  onDayOver,
  dateHovered,
  onChooseEndDate,
  endDate,
  monthIndex,
  hasTooltip,
  numDaysInRange,
  updateDaysNumber,
  tooltipLabel
}) => {
  const handlePrevMonth = () => {
    if (range) {
      if (monthIndex === 0) {
        prevMonth();
      }
    } else {
      prevMonth();
    }
  };
  const handleNextMonth = () => {
    if (range) {
      if (monthIndex === 1) {
        nextMonth();
      }
    } else {
      nextMonth();
    }
  };
  return (
    <div className="xflex xflex-column xflex-datepicker-month">
      <div className="xflex xflex-justify-content-center xflex-datepicker-month-header">
        <div onClick={handlePrevMonth} className="xflex-datepicker-left-angle">
          {(range && ((monthIndex === 0 && <LeftAngle />) || <div></div>)) || (
            <LeftAngle />
          )}
        </div>
        <div className="xflex-datepicker-month-header-title">
          <strong>
            {monthLabel} {yearLabel}
          </strong>
        </div>
        <div onClick={handleNextMonth} className="xflex-datepicker-right-angle">
          {(range && ((monthIndex === 1 && <RightAngle />) || <div></div>)) || (
            <RightAngle />
          )}
        </div>
      </div>
      <Weeks
        {...{
          weeks,
          daysShort,
          month,
          date: selectedDate,
          range,
          onDayOver,
          dateHovered,
          onChooseEndDate,
          endDate,
          hasTooltip,
          numDaysInRange,
          updateDaysNumber,
          tooltipLabel
        }}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default MonthBox;
