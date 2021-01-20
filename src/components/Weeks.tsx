import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import WeekdaySquare from './WeekdaySquare';
import { IWeeksProps } from '../types';
import { useCalendarActions, useCalendarState } from '../services/calendar-provider';

const Weeks = ({
    month,
    range,
    numDaysInRange,
    updateDaysNumber = () => {},
    tooltipLabel = num => {
        return num;
    },
}: IWeeksProps) => {
    const { startDate, endDate, hasTooltip, daysShort, weeks, nextWeeks, currentMonthView, nextMonthView } = useCalendarState();
    const { setStartDate, setEndDate, setHoveredDate } = useCalendarActions();

    const handleDayClick = (day: Moment) => {
        if ((month === 0 ? currentMonthView : nextMonthView) === day.month()) {
            if (range) {
                if (startDate) {
                    if (moment(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD'))) {
                        setEndDate(day);
                        setHoveredDate(day);
                    } else {
                        setStartDate(day);
                    }
                } else setStartDate(day);
            } else setStartDate(day);
        }
    };

    const handleMouseOver = (day: Moment) => {
        if ((month === 0 ? currentMonthView : nextMonthView) === day.month() && range) {
            if (!endDate) setHoveredDate(day);
            else if (moment(day.format('YYYY-MM-DD')).isAfter(endDate.format('YYYY-MM-DD'))) {
                setHoveredDate(day);
            } else setHoveredDate(endDate);
        }
        updateDaysNumber(day);
    };

    return (
        <div className="xflex xflex-justify-content-around xflex-datepicker-weeks">
            {(month === 0 ? weeks : nextWeeks).map((week, index) => (
                <div key={index} className="xflex xflex-column xflex-datepicker-weeks-day-column">
                    <div className="xflex xflex-align-items-center xflex-datepicker-weeks-label-square xflex-justify-content-center">
                        <div className="xflex xflex-justify-content-center xflex-datepicker-weeks-label">{daysShort[index]}</div>
                    </div>
                    <div className="xflex xflex-column xflex-align-items-center xflex-datepicker-dates-column">
                        {week.map((day: Moment) => (
                            <WeekdaySquare
                                key={day.toLocaleString()}
                                {...{
                                    day,
                                    endDate,
                                    hasTooltip,
                                    month: currentMonthView,
                                    monthIndex: month,
                                    numDaysInRange,
                                    range,
                                    tooltipLabel,
                                    handleDayClick,
                                    handleMouseOver,
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Weeks;
