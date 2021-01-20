import React, { useEffect } from 'react';
import { LeftAngle, RightAngle } from '../svg';
import Weeks from '../components/Weeks';
import { IMonthProps } from '../types';
import { useCalendarActions, useCalendarState } from '../services/calendar-provider';

const MonthBox = ({ range = false, monthIndex, numDaysInRange, updateDaysNumber, tooltipLabel }: IMonthProps) => {
    const { monthLabel, yearLabel, monthLabelNext, yearLabelNext } = useCalendarState();
    const { prevMonth, nextMonth } = useCalendarActions();
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
                <button onClick={handlePrevMonth} className="xflex-datepicker-left-angle">
                    {(range && ((monthIndex === 0 && <LeftAngle />) || <div></div>)) || <LeftAngle />}
                </button>
                <div className="xflex-datepicker-month-header-title">
                    <strong>
                        {monthIndex === 0 ? monthLabel : monthLabelNext} {monthIndex === 0 ? yearLabel : yearLabelNext}
                    </strong>
                </div>
                <button onClick={handleNextMonth} className="xflex-datepicker-right-angle">
                    {(range && ((monthIndex === 1 && <RightAngle />) || <div></div>)) || <RightAngle />}
                </button>
            </div>
            <Weeks
                {...{
                    month: monthIndex,
                    range,
                    numDaysInRange,
                    updateDaysNumber,
                    tooltipLabel,
                }}
            />
        </div>
    );
};

export default MonthBox;
