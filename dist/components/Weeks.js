"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var WeekdaySquare_1 = __importDefault(require("./WeekdaySquare"));
var calendar_provider_1 = require("../services/calendar-provider");
var Weeks = function (_a) {
    var month = _a.month, range = _a.range, numDaysInRange = _a.numDaysInRange, _b = _a.updateDaysNumber, updateDaysNumber = _b === void 0 ? function () { } : _b, _c = _a.tooltipLabel, tooltipLabel = _c === void 0 ? function (num) {
        return num;
    } : _c;
    var _d = calendar_provider_1.useCalendarState(), startDate = _d.startDate, endDate = _d.endDate, hasTooltip = _d.hasTooltip, daysShort = _d.daysShort, weeks = _d.weeks, nextWeeks = _d.nextWeeks, currentMonthView = _d.currentMonthView, nextMonthView = _d.nextMonthView;
    var _e = calendar_provider_1.useCalendarActions(), setStartDate = _e.setStartDate, setEndDate = _e.setEndDate, setHoveredDate = _e.setHoveredDate;
    var handleDayClick = function (day) {
        if ((month === 0 ? currentMonthView : nextMonthView) === day.month()) {
            if (range) {
                if (startDate) {
                    if (moment_1.default(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD'))) {
                        setEndDate(day);
                        setHoveredDate(day);
                    }
                    else {
                        setStartDate(day);
                    }
                }
                else
                    setStartDate(day);
            }
            else
                setStartDate(day);
        }
    };
    var handleMouseOver = function (day) {
        if ((month === 0 ? currentMonthView : nextMonthView) === day.month() && range) {
            if (!endDate)
                setHoveredDate(day);
            else if (moment_1.default(day.format('YYYY-MM-DD')).isAfter(endDate.format('YYYY-MM-DD'))) {
                setHoveredDate(day);
            }
            else
                setHoveredDate(endDate);
        }
        updateDaysNumber(day);
    };
    return (react_1.default.createElement("div", { className: "xflex xflex-justify-content-around xflex-datepicker-weeks" }, (month === 0 ? weeks : nextWeeks).map(function (week, index) { return (react_1.default.createElement("div", { key: index, className: "xflex xflex-column xflex-datepicker-weeks-day-column" },
        react_1.default.createElement("div", { className: "xflex xflex-align-items-center xflex-datepicker-weeks-label-square xflex-justify-content-center" },
            react_1.default.createElement("div", { className: "xflex xflex-justify-content-center xflex-datepicker-weeks-label" }, daysShort[index])),
        react_1.default.createElement("div", { className: "xflex xflex-column xflex-align-items-center xflex-datepicker-dates-column" }, week.map(function (day) { return (react_1.default.createElement(WeekdaySquare_1.default, __assign({ key: day.toLocaleString() }, {
            day: day,
            endDate: endDate,
            hasTooltip: hasTooltip,
            month: currentMonthView,
            monthIndex: month,
            numDaysInRange: numDaysInRange,
            range: range,
            tooltipLabel: tooltipLabel,
            handleDayClick: handleDayClick,
            handleMouseOver: handleMouseOver,
        }))); })))); })));
};
exports.default = Weeks;
