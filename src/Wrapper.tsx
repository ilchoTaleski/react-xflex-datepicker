import React, { useEffect, useState } from 'react';
import MonthBox from './containers/MonthBox';
import CloseIcon from './svg/components/CloseIcon';
import InsideComponent from './innerPlugins/InsideComponent';
import { IDatepickerProps } from './types';
import { useCalendarActions, useCalendarState } from './services/calendar-provider';

const Wrapper = ({ onCalendarHide, onCalendarShow, onChooseDate, onClearDate, onMonthDayOver }: IDatepickerProps) => {
    const { startDate, inputControl, position, format, placeholder, buttonControlClassName } = useCalendarState();
    const { setStartDate, setEndDate, viewIntoStartDate } = useCalendarActions();
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarTopProperty, setCalendarTopProperty] = useState(0);

    let ic = inputControl;
    if (ic === undefined) ic = true;

    useEffect(() => {
        if (typeof document !== 'undefined') {
            let el = document?.getElementById('top-property-calendar');
            if (el) {
                setCalendarTopProperty(el.offsetHeight);
            }
        } else {
            setCalendarTopProperty(0);
        }
    });

    useEffect(() => {
        if (onChooseDate && startDate) onChooseDate({ date: startDate });
        if (startDate) hideCalendar();
    }, [startDate]);

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
                date: startDate,
            });
        e.stopPropagation();
        setStartDate(null);
        setEndDate(null);
    };

    const updateDaysNumber = day => {
        onMonthDayOver && onMonthDayOver(day);
    };

    if (!inputControl)
        return (
            <div>
                <MonthBox
                    {...{
                        updateDaysNumber,
                    }}
                    range={false}
                    monthIndex={0}
                />
            </div>
        );
    else
        return (
            <div>
                <div className="xflex-datepicker-control-wrapper">
                    <button
                        className={`xflex xflex-justify-content-between xflex-datepicker-control ${buttonControlClassName}`}
                        onClick={showCalendar}
                        type="button"
                    >
                        {(!startDate && <span>{placeholder}</span>) || <span>{startDate.format(format)}</span>}
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
                        }}
                    >
                        {calendarVisible && (
                            <InsideComponent onOutsideClick={hideCalendar}>
                                <>
                                    <div
                                        style={{
                                            visibility:
                                                position === 'top' ? (calendarTopProperty > 0 ? 'visible' : 'hidden') : 'visible',
                                        }}
                                    >
                                        <MonthBox
                                            {...{
                                                updateDaysNumber,
                                            }}
                                            range={false}
                                            monthIndex={0}
                                        />
                                    </div>
                                </>
                            </InsideComponent>
                        )}
                    </div>
                </div>
            </div>
        );
};

export default Wrapper;
