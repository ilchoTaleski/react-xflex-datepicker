import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MonthBox from './containers/MonthBox';
import { mod } from './services/modulus';
import './index.css';
import { generateWeeks } from './services/weeksGenerator';
import CloseIcon from './svg/components/CloseIcon';
import InsideComponent from './innerPlugins/InsideComponent';

const Wrapper = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthLabel, setMonthLabel] = useState('');
  const [yearLabel, setYearLabel] = useState('');
  const [daysShort, setDaysShort] = useState([]);
  const [dateHovered, setDateHovered] = useState(null);
  const [currentMonthView, setCurrentMonthView] = useState(0);
  const [currentYearView, setCurrentYearView] = useState(0);
  const [weeks, setWeeks] = useState([]);
  const [buttonControl, setButtonControl] = useState(null);
  const [position, setPosition] = useState('bottom');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarTopProperty, setCalendarTopProperty] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [format, setFormat] = useState('YYYY-MM-DD');
  const [placeholder, setPlaceholder] = useState('Choose date...');

  useEffect(() => {
    let el = document.getElementById('top-property-calendar');
    if (el) {
      setCalendarTopProperty(el.offsetHeight);
    }
  });

  useEffect(() => {
    const {
      initialDate = moment(),
      locale = 'en',
      inputControl = true,
      position = 'bottom',
      format = 'YYYY-MM-DD',
      placeholder = 'Choose date...'
    } = props;

    moment.locale(locale);
    setButtonControl(inputControl);
    setPosition(position);
    setFormat(format);
    setPlaceholder(placeholder);

    setStartDate(initialDate);
    setSelectedDate(initialDate);
    let daysShort = moment.weekdaysShort();
    let first = daysShort.shift();
    daysShort.push(first);
    setDaysShort(daysShort);
  }, []);

  useEffect(() => {
    const {
      locale = 'en',
      position = 'bottom',
      format = 'YYYY-MM-DD',
      placeholder = 'Choose date...'
    } = props;
    moment.locale(locale);
    setPosition(position);
    setFormat(format);
    setPlaceholder(placeholder);
  }, [props.locale, props.position, props.format, props.placeholder]);

  useEffect(() => {
    if (startDate) {
      setCurrentMonthView(startDate.month());
      setCurrentYearView(startDate.year());
    }
  }, [startDate]);

  useEffect(() => {
    setMonthLabel(
      moment()
        .month(currentMonthView)
        .format('MMMM')
    );
    setYearLabel(
      moment()
        .year(currentYearView)
        .format('YYYY')
    );
    let generatedWeeks = generateWeeks(currentMonthView, currentYearView);
    console.log(generatedWeeks);
    let transpose = generatedWeeks[0].map((col, i) =>
      generatedWeeks.map(row => row[i])
    );
    setWeeks(transpose);
  }, [currentMonthView, currentYearView]);

  const prevMonth = () => {
    let nm = +currentMonthView - 1;

    if (nm < 0) {
      setCurrentYearView(+currentYearView - 1);
      setCurrentMonthView(mod(nm, 12));
    } else {
      setCurrentMonthView(nm);
    }
  };
  const nextMonth = () => {
    let nm = +currentMonthView + 1;
    if (nm > 11) {
      setCurrentYearView(+currentYearView + 1);
      setCurrentMonthView(mod(nm, 12));
    } else {
      setCurrentMonthView(nm);
    }
  };

  const showCalendar = () => {
    setCalendarVisible(true);
    props.onCalendarShow && props.onCalendarShow();
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
    props.onCalendarHide && props.onCalendarHide();
  };

  const handleDateClick = date => {
    props.onChooseDate && props.onChooseDate({ date: date });
    setSelectedDate(date);
  };

  const handleCloseDate = e => {
    props.onClearDate &&
      props.onClearDate({
        date: selectedDate
      });
    e.stopPropagation();
    setSelectedDate(null);
  };

  const handleDayOver = day => {};

  const updateDaysNumber = day => {
    props.onMonthDayOver && props.onMonthDayOver(day);
  };

  if (!buttonControl)
    return (
      <div>
        <MonthBox
          {...{
            monthLabel,
            yearLabel,
            daysShort,
            prevMonth,
            nextMonth,
            weeks,
            currentMonthView,
            selectedDate,
            dateHovered,
            endDate,
            updateDaysNumber
          }}
          onDateClick={handleDateClick}
          onDayOver={handleDayOver}
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
            className="xflex xflex-justify-content-between xflex-datepicker-control"
            onClick={showCalendar}
          >
            {(!selectedDate && <span>{placeholder}</span>) || (
              <span>{selectedDate.format(format)}</span>
            )}
            {selectedDate && (
              <span style={{ width: '20px' }} onClick={handleCloseDate}>
                <CloseIcon />
              </span>
            )}
          </button>
          <div
            id="top-property-calendar"
            className="xflex-datepicker-monthbox-wrapper"
            style={{
              top: position === 'top' ? `-${calendarTopProperty}px` : 'unset'
            }}
          >
            {calendarVisible && (
              <InsideComponent onOutsideClick={hideCalendar}>
                <div
                  style={{
                    visibility:
                      position === 'top'
                        ? calendarTopProperty > 0
                          ? 'visible'
                          : 'hidden'
                        : 'visible'
                  }}
                >
                  <MonthBox
                    {...{
                      monthLabel,
                      yearLabel,
                      daysShort,
                      prevMonth,
                      nextMonth,
                      weeks,
                      currentMonthView,
                      selectedDate,
                      dateHovered,
                      endDate,
                      updateDaysNumber
                    }}
                    onDateClick={handleDateClick}
                    onDayOver={handleDayOver}
                    range={false}
                    monthIndex={0}
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
