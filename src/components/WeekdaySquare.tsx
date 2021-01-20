import React from 'react';
import moment, { Moment } from 'moment';
import ReactTooltip from 'react-tooltip';
import { useCalendarState } from '../services/calendar-provider';

interface IWeekdaySquareProps {
    day: Moment;
    month: number;
    handleDayClick?: (day: Moment) => void;
    handleMouseOver?: (day: Moment) => void;
    range: boolean;
    hasTooltip: boolean;
    tooltipLabel: (num: number) => string | number;
    numDaysInRange: number;
    key?: string;
    monthIndex?: number;
}

const WeekdaySquare = ({
    day,
    month,
    handleDayClick,
    handleMouseOver,
    range,
    hasTooltip,
    tooltipLabel,
    numDaysInRange,
    monthIndex,
}: IWeekdaySquareProps) => {
    const { startDate, endDate, hoveredDate, nextMonthView } = useCalendarState();

    return (
        <div
            key={day.format('YYYY-MM-DD')}
            className={`xflex xflex-align-items-center xflex-datepicker-dates-square ${
                (monthIndex === 0 ? month : nextMonthView) !== day.month() ? '--other-month' : ''
            } ${startDate && moment(startDate.format('YYYY-MM-DD')).isSame(day.format('YYYY-MM-DD')) ? '--selected' : ''} ${
                endDate && moment(endDate.format('YYYY-MM-DD')).isSame(day.format('YYYY-MM-DD')) ? '--selected' : ''
            } ${
                startDate &&
                hoveredDate &&
                moment(day.format('YYYY-MM-DD')).isBefore(hoveredDate.format('YYYY-MM-DD')) &&
                moment(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD'))
                    ? '--in-range'
                    : ''
            } xflex-justify-content-center`}
            onClick={() => handleDayClick(day)}
            onMouseOver={() => handleMouseOver(day)}
            data-tip
            data-for={(monthIndex === 0 ? month : nextMonthView) === day.month() ? `day-${day.format('YYYY-MM-DD')}` : ''}
        >
            <div
                className={`xflex xflex-justify-content-center xflex-datepicker-dates-label ${
                    (monthIndex === 0 ? month : nextMonthView) !== day.month() ? '--other-month' : ''
                }`}
            >
                {day.date()}
            </div>
            {range &&
                hasTooltip &&
                startDate &&
                moment(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD')) &&
                +(monthIndex === 0 ? month : nextMonthView) === day.month() && (
                    <ReactTooltip id={`day-${day.format('YYYY-MM-DD')}`} type="info" effect="solid" delayShow={0}>
                        <span>{tooltipLabel(numDaysInRange)}</span>
                    </ReactTooltip>
                )}
        </div>
    );
};

export default WeekdaySquare;
