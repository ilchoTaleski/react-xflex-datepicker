import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MonthBox from './containers/MonthBox';
import { mod } from './services/modulus';
import './index.css';
import { generateWeeks } from './services/weeksGenerator';
import CloseIcon from './svg/components/CloseIcon';
import InsideComponent from './innerPlugins/InsideComponent';
import { RightAngle } from './svg';

const Wrapper = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateHovered, setDateHovered] = useState(null);
  const [monthLabel, setMonthLabel] = useState('');
  const [monthLabelNext, setMonthLabelNext] = useState('');
  const [yearLabel, setYearLabel] = useState('');
  const [yearLabelNext, setYearLabelNext] = useState('');
  const [daysShort, setDaysShort] = useState([]);
  const [currentMonthView, setCurrentMonthView] = useState(0);
  const [currentYearView, setCurrentYearView] = useState(0);
  const [weeks, setWeeks] = useState([]);
  const [weeksNext, setWeeksNext] = useState([]);
  const [buttonControl, setButtonControl] = useState(null);
  const [position, setPosition] = useState('bottom');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarTopProperty, setCalendarTopProperty] = useState(0);
  const [calendarLeftProperty, setCalendarLeftProperty] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [format, setFormat] = useState('YYYY-MM-DD');
  const [placeholder, setPlaceholder] = useState('Choose date...');
  const [hasTooltip, setHasTooltip] = useState(true);
  const [numDaysInRange, setNumDaysInRange] = useState(0);
  const [tooltipLabel, setTooltipLabel] = useState('');

  useEffect(() => {
    let el = document.getElementById('top-property-calendar');
    if (el) {
      setCalendarTopProperty(el.offsetHeight);
      let bounding = el.getBoundingClientRect();
      if (
        bounding.right >
        (window.innerWidth || document.documentElement.clientWidth)
      ) {
        // Right side is out of viewport
        let diff = window.innerWidth - bounding.right;
        setCalendarLeftProperty(diff);
        console.log(diff);
      }
    }
  }, [calendarVisible]);

  useEffect(() => {
    const {
      initialDate = moment(),
      locale = 'en',
      inputControl = true,
      position = 'bottom',
      format = 'YYYY-MM-DD',
      placeholder = 'Choose date...',
      hasTooltip = true
    } = props;

    moment.locale(locale);
    setButtonControl(inputControl);
    setPosition(position);
    setFormat(format);
    setPlaceholder(placeholder);
    setHasTooltip(hasTooltip);

    setStartDate(initialDate);
    setSelectedDate(initialDate);
    setEndDate(initialDate);
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
      placeholder = 'Choose date...',
      hasTooltip = true
    } = props;
    moment.locale(locale);
    setPosition(position);
    setFormat(format);
    setPlaceholder(placeholder);
    setHasTooltip(hasTooltip);
  }, [
    props.locale,
    props.position,
    props.format,
    props.placeholder,
    props.hasTooltip
  ]);

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
    let [m, y] = getNextMonthYear(currentMonthView, currentYearView);
    setMonthLabelNext(
      moment()
        .month(m)
        .format('MMMM')
    );
    setYearLabelNext(
      moment()
        .year(y)
        .format('YYYY')
    );
    let generatedWeeks = generateWeeks(currentMonthView, currentYearView);
    let generatedWeeksNext = generateWeeks(m, y);
    let transpose = generatedWeeks[0].map((col, i) =>
      generatedWeeks.map(row => row[i])
    );
    let transposeNext = generatedWeeksNext[0].map((col, i) =>
      generatedWeeksNext.map(row => row[i])
    );
    setWeeks(transpose);
    setWeeksNext(transposeNext);
  }, [currentMonthView, currentYearView]);

  const getNextMonthYear = (month, year) => {
    let nm = +month + 1;
    let m, y;
    if (nm > 11) {
      y = +year + 1;
      m = mod(nm, 12);
    } else {
      y = year;
      m = nm;
    }
    return [m, y];
  };

  const getPrevMonthYear = (month, year) => {
    let nm = +month - 1;
    let m, y;
    if (nm < 0) {
      y = +year - 1;
      m = mod(nm, 12);
    } else {
      y = year;
      m = nm;
    }
    return [m, y];
  };

  const prevMonth = () => {
    let [m, y] = getPrevMonthYear(currentMonthView, currentYearView);
    setCurrentYearView(y);
    setCurrentMonthView(m);
  };
  const nextMonth = () => {
    let [m, y] = getNextMonthYear(currentMonthView, currentYearView);
    setCurrentYearView(y);
    setCurrentMonthView(m);
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
    props.onChooseDate &&
      props.onChooseDate({
        start: date,
        end: null
      });
    setSelectedDate(date);
    setDateHovered(date);
    setEndDate(null);
  };

  const handleCloseDate = e => {
    props.onClearDate &&
      props.onClearDate({
        start: selectedDate,
        end: endDate
      });
    e.stopPropagation();
    setSelectedDate(null);
    setEndDate(null);
  };

  const handleDayOver = day => {
    setDateHovered(day);
  };

  const handleChooseEndDate = day => {
    setEndDate(day);
    props.onChooseDate &&
      props.onChooseDate({
        start: selectedDate,
        end: day
      });
    hideCalendar();
  };

  const handleOutsideMouseOver = e => {
    if (endDate) setDateHovered(endDate);
  };

  const updateDaysNumber = day => {
    if (selectedDate) {
      let sm = selectedDate.clone();
      let dm = day.clone();
      let counter = 0;
      while (
        moment(sm.format('YYYY-MM-DD')).isBefore(dm.format('YYYY-MM-DD'))
      ) {
        sm.add('days', 1);
        counter++;
      }
      setNumDaysInRange(counter);
    }
    props.onMonthDayOver && props.onMonthDayOver(day);
  };

  if (!buttonControl)
    return (
      <div className="xflex">
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
            hasTooltip,
            numDaysInRange,
            updateDaysNumber,
            tooltipLabel: props.tooltipLabel
          }}
          onDateClick={handleDateClick}
          onDayOver={handleDayOver}
          onChooseEndDate={handleChooseEndDate}
          range={true}
          monthIndex={0}
        />
        <MonthBox
          {...{
            monthLabel: monthLabelNext,
            yearLabel: yearLabelNext,
            daysShort,
            prevMonth,
            nextMonth,
            weeks: weeksNext,
            currentMonthView: getNextMonthYear(
              currentMonthView,
              currentYearView
            )[0],
            selectedDate,
            dateHovered,
            endDate,
            hasTooltip,
            numDaysInRange,
            updateDaysNumber,
            tooltipLabel: props.tooltipLabel
          }}
          onDayOver={handleDayOver}
          onDateClick={handleDateClick}
          onChooseEndDate={handleChooseEndDate}
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
            className="xflex xflex-justify-content-between xflex-datepicker-control-range"
            onClick={showCalendar}
          >
            {(!selectedDate && <span>{placeholder}</span>) || (
              <div>
                <span>{selectedDate.format(format)}</span>
                <span style={{ padding: '0 10px' }}>
                  <RightAngle />
                </span>
                {endDate && <span>{endDate.format(format)}</span>}
              </div>
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
              top: position === 'top' ? `-${calendarTopProperty}px` : 'unset',
              left:
                calendarLeftProperty < 0
                  ? `${calendarLeftProperty - 10}px`
                  : '0'
            }}
          >
            {calendarVisible && (
              <InsideComponent
                onOutsideClick={hideCalendar}
                onOutsideMouseOver={handleOutsideMouseOver}
              >
                <div
                  style={{
                    visibility:
                      position === 'top'
                        ? calendarTopProperty > 0
                          ? 'visible'
                          : 'hidden'
                        : 'visible'
                  }}
                  className="xflex"
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
                      hasTooltip,
                      numDaysInRange,
                      updateDaysNumber,
                      tooltipLabel: props.tooltipLabel
                    }}
                    onDateClick={handleDateClick}
                    onDayOver={handleDayOver}
                    onChooseEndDate={handleChooseEndDate}
                    range={true}
                    monthIndex={0}
                  />
                  <MonthBox
                    {...{
                      monthLabel: monthLabelNext,
                      yearLabel: yearLabelNext,
                      daysShort,
                      prevMonth,
                      nextMonth,
                      weeks: weeksNext,
                      currentMonthView: getNextMonthYear(
                        currentMonthView,
                        currentYearView
                      )[0],
                      selectedDate,
                      dateHovered,
                      endDate,
                      hasTooltip,
                      numDaysInRange,
                      updateDaysNumber,
                      tooltipLabel: props.tooltipLabel
                    }}
                    onDayOver={handleDayOver}
                    onDateClick={handleDateClick}
                    onChooseEndDate={handleChooseEndDate}
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
