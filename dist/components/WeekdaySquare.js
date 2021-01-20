"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var react_tooltip_1 = __importDefault(require("react-tooltip"));
var calendar_provider_1 = require("../services/calendar-provider");
var WeekdaySquare = function (_a) {
    var day = _a.day, month = _a.month, handleDayClick = _a.handleDayClick, handleMouseOver = _a.handleMouseOver, range = _a.range, hasTooltip = _a.hasTooltip, tooltipLabel = _a.tooltipLabel, numDaysInRange = _a.numDaysInRange, monthIndex = _a.monthIndex;
    var _b = calendar_provider_1.useCalendarState(), startDate = _b.startDate, endDate = _b.endDate, hoveredDate = _b.hoveredDate, nextMonthView = _b.nextMonthView;
    return (react_1.default.createElement("div", { key: day.format('YYYY-MM-DD'), className: "xflex xflex-align-items-center xflex-datepicker-dates-square " + ((monthIndex === 0 ? month : nextMonthView) !== day.month() ? '--other-month' : '') + " " + (startDate && moment_1.default(startDate.format('YYYY-MM-DD')).isSame(day.format('YYYY-MM-DD')) ? '--selected' : '') + " " + (endDate && moment_1.default(endDate.format('YYYY-MM-DD')).isSame(day.format('YYYY-MM-DD')) ? '--selected' : '') + " " + (startDate &&
            hoveredDate &&
            moment_1.default(day.format('YYYY-MM-DD')).isBefore(hoveredDate.format('YYYY-MM-DD')) &&
            moment_1.default(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD'))
            ? '--in-range'
            : '') + " xflex-justify-content-center", onClick: function () { return handleDayClick(day); }, onMouseOver: function () { return handleMouseOver(day); }, "data-tip": true, "data-for": (monthIndex === 0 ? month : nextMonthView) === day.month() ? "day-" + day.format('YYYY-MM-DD') : '' },
        react_1.default.createElement("div", { className: "xflex xflex-justify-content-center xflex-datepicker-dates-label " + ((monthIndex === 0 ? month : nextMonthView) !== day.month() ? '--other-month' : '') }, day.date()),
        range &&
            hasTooltip &&
            startDate &&
            moment_1.default(day.format('YYYY-MM-DD')).isAfter(startDate.format('YYYY-MM-DD')) &&
            +(monthIndex === 0 ? month : nextMonthView) === day.month() && (react_1.default.createElement(react_tooltip_1.default, { id: "day-" + day.format('YYYY-MM-DD'), type: "info", effect: "solid", delayShow: 0 },
            react_1.default.createElement("span", null, tooltipLabel(numDaysInRange))))));
};
exports.default = WeekdaySquare;
