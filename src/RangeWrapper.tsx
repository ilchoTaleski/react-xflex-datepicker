import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MonthBox from './containers/MonthBox';
import { mod } from './services/modulus';
import { generateWeeks } from './services/weeksGenerator';
import CloseIcon from './svg/components/CloseIcon';
import InsideComponent from './innerPlugins/InsideComponent';
import { RightAngle } from './svg';
import { IDatepickerRangeProps } from './types';
import { useCalendarActions, useCalendarState } from './services/calendar-provider';

const Wrapper = ({
    onCalendarHide,
    onCalendarShow,
    onChooseDate,
    onClearDate,
    onMonthDayOver,
    tooltipLabel = num => `${num}`,
}: IDatepickerRangeProps) => {
    const { startDate, endDate, inputControl, position, format, placeholder, buttonControlClassName } = useCalendarState();
    const { setStartDate, setEndDate, viewIntoStartDate, setHoveredDate } = useCalendarActions();
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarTopProperty, setCalendarTopProperty] = useState(0);
    const [calendarLeftProperty, setCalendarLeftProperty] = useState(0);
    const [numDaysInRange, setNumDaysInRange] = useState(0);

    // console.log('months', monthLabel, monthLabelNext, currentMonthView);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            let el = document?.getElementById('top-property-calendar');
            if (el) {
                setCalendarTopProperty(el.offsetHeight);
                let bounding = el.getBoundingClientRect();
                if (bounding.right > (window.innerWidth || document?.documentElement.clientWidth)) {
                    // Right side is out of viewport
                    let diff = window.innerWidth - bounding.right;
                    setCalendarLeftProperty(diff);
                    console.log(diff);
                }
            }
        }
    }, [calendarVisible]);

    useEffect(() => {
        if (onChooseDate && startDate) {
            onChooseDate({ start: startDate, end: null });
        }
    }, [startDate]);

    useEffect(() => {
        if (onChooseDate && endDate) {
            onChooseDate({ start: startDate, end: endDate });
        }
    }, [endDate]);

    const showCalendar = () => {
        viewIntoStartDate();
        setCalendarVisible(true);
        onCalendarShow && onCalendarShow();
    };

    const hideCalendar = () => {
        setCalendarVisible(false);
        onCalendarHide && onCalendarHide();
    };

    const handleCloseDate = e => {
        onClearDate &&
            onClearDate({
                start: startDate,
                end: endDate,
            });
        e.stopPropagation();
        setStartDate(null);
        setEndDate(null);
    };

    const handleOutsideMouseOver = e => {
        setHoveredDate(endDate);
    };

    const updateDaysNumber = day => {
        if (startDate) {
            let sm = startDate.clone();
            let dm = day.clone();
            let counter = 0;
            while (moment(sm.format('YYYY-MM-DD')).isBefore(dm.format('YYYY-MM-DD'))) {
                sm.add(1, 'days');
                counter++;
            }
            setNumDaysInRange(counter);
        }
        onMonthDayOver && onMonthDayOver(day);
    };

    if (!inputControl)
        return (
            <div className="xflex">
                <MonthBox
                    {...{
                        numDaysInRange,
                        updateDaysNumber,
                        tooltipLabel,
                    }}
                    range={true}
                    monthIndex={0}
                />
                <MonthBox
                    {...{
                        numDaysInRange,
                        updateDaysNumber,
                        tooltipLabel,
                    }}
                    range={true}
                    monthIndex={1}
                />
            </div>
        );
    else
        return (
            <div>
                <div className="xflex-datepicker-control-wrapper">
                    <button
                        className={`xflex xflex-justify-content-between xflex-datepicker-control-range ${buttonControlClassName}`}
                        onClick={showCalendar}
                        type="button"
                    >
                        {(!startDate && <span>{placeholder}</span>) || (
                            <div>
                                <span>{startDate.format(format)}</span>
                                <span style={{ padding: '0 10px' }}>
                                    <RightAngle />
                                </span>
                                {endDate && <span>{endDate.format(format)}</span>}
                            </div>
                        )}
                        {startDate && (
                            <span style={{ width: '20px' }} onClick={handleCloseDate}>
                                <CloseIcon />
                            </span>
                        )}
                    </button>
                    <div
                        id="top-property-calendar"
                        className="xflex-datepicker-monthbox-wrapper"
                        style={{
                            top: position === 'top' ? `-${calendarTopProperty}px` : 'unset',
                            left: calendarLeftProperty < 0 ? `${calendarLeftProperty - 10}px` : '0',
                        }}
                    >
                        {calendarVisible && (
                            <InsideComponent onOutsideClick={hideCalendar} onOutsideMouseOver={handleOutsideMouseOver}>
                                <div
                                    style={{
                                        visibility:
                                            position === 'top' ? (calendarTopProperty > 0 ? 'visible' : 'hidden') : 'visible',
                                    }}
                                    className="xflex"
                                >
                                    <MonthBox
                                        {...{
                                            numDaysInRange,
                                            updateDaysNumber,
                                            tooltipLabel,
                                        }}
                                        range={true}
                                        monthIndex={0}
                                    />
                                    <MonthBox
                                        {...{
                                            numDaysInRange,
                                            updateDaysNumber,
                                            tooltipLabel,
                                        }}
                                        range={true}
                                        monthIndex={1}
                                    />
                                </div>
                            </InsideComponent>
                        )}
                    </div>
                </div>
            </div>
        );
};

export default Wrapper;
