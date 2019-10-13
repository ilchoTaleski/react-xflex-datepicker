import React, { useState } from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

const Weeks = ({
  weeks,
  daysShort,
  month,
  date,
  onDateClick = () => {},
  onChooseEndDate = () => {},
  range,
  onDayOver,
  dateHovered,
  endDate,
  hasTooltip,
  numDaysInRange = () => {},
  updateDaysNumber = () => {},
  tooltipLabel = num => {
    return num;
  }
}) => {
  const handleDayClick = day => {
    if (month === day.month()) {
      if (range) {
        if (date) {
          if (
            moment(day.format('YYYY-MM-DD')).isAfter(date.format('YYYY-MM-DD'))
          ) {
            onChooseEndDate(day);
            onDayOver(day);
          } else {
            onDateClick(day);
          }
        } else onDateClick(day);
      } else onDateClick(day);
    }
  };

  const handleMouseOver = day => {
    if (month === day.month() && range) {
      if (!endDate) onDayOver(day);
      else if (
        moment(day.format('YYYY-MM-DD')).isAfter(endDate.format('YYYY-MM-DD'))
      ) {
        onDayOver(day);
      } else onDayOver(endDate);
    }
    updateDaysNumber(day);
  };

  return (
    <div className="xflex xflex-justify-content-around xflex-datepicker-weeks">
      {weeks.map((week, index) => (
        <div
          key={index}
          className="xflex xflex-column xflex-datepicker-weeks-day-column"
        >
          <div className="xflex xflex-align-items-center xflex-datepicker-weeks-label-square xflex-justify-content-center">
            <div className="xflex xflex-justify-content-center xflex-datepicker-weeks-label">
              {daysShort[index]}
            </div>
          </div>
          <div className="xflex xflex-column xflex-align-items-center xflex-datepicker-dates-column">
            {week.map(day => (
              <div
                key={day.format('YYYY-MM-DD')}
                className={`xflex xflex-align-items-center xflex-datepicker-dates-square ${
                  month !== day.month() ? '--other-month' : ''
                } ${
                  date &&
                  moment(date.format('YYYY-MM-DD')).isSame(
                    day.format('YYYY-MM-DD')
                  )
                    ? '--selected'
                    : ''
                } ${
                  endDate &&
                  moment(endDate.format('YYYY-MM-DD')).isSame(
                    day.format('YYYY-MM-DD')
                  )
                    ? '--selected'
                    : ''
                } ${
                  date &&
                  dateHovered &&
                  moment(day.format('YYYY-MM-DD')).isBefore(
                    dateHovered.format('YYYY-MM-DD')
                  ) &&
                  moment(day.format('YYYY-MM-DD')).isAfter(
                    date.format('YYYY-MM-DD')
                  )
                    ? '--in-range'
                    : ''
                } xflex-justify-content-center`}
                onClick={() => handleDayClick(day)}
                onMouseOver={() => handleMouseOver(day)}
                data-tip
                data-for={
                  month === day.month() ? `day-${day.format('YYYY-MM-DD')}` : ''
                }
              >
                <div
                  className={`xflex xflex-justify-content-center xflex-datepicker-dates-label ${
                    month !== day.month() ? '--other-month' : ''
                  }`}
                >
                  {day.date()}
                </div>
                {range &&
                  hasTooltip &&
                  date &&
                  moment(day.format('YYYY-MM-DD')).isAfter(
                    date.format('YYYY-MM-DD')
                  ) &&
                  +month === day.month() && (
                    <ReactTooltip
                      id={`day-${day.format('YYYY-MM-DD')}`}
                      type="info"
                      effect="solid"
                      delayShow={0}
                    >
                      <span>{tooltipLabel(numDaysInRange)}</span>
                    </ReactTooltip>
                  )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Weeks;
