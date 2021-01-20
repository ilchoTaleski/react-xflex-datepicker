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
var svg_1 = require("../svg");
var Weeks_1 = __importDefault(require("../components/Weeks"));
var calendar_provider_1 = require("../services/calendar-provider");
var MonthBox = function (_a) {
    var _b = _a.range, range = _b === void 0 ? false : _b, monthIndex = _a.monthIndex, numDaysInRange = _a.numDaysInRange, updateDaysNumber = _a.updateDaysNumber, tooltipLabel = _a.tooltipLabel;
    var _c = calendar_provider_1.useCalendarState(), monthLabel = _c.monthLabel, yearLabel = _c.yearLabel, monthLabelNext = _c.monthLabelNext, yearLabelNext = _c.yearLabelNext;
    var _d = calendar_provider_1.useCalendarActions(), prevMonth = _d.prevMonth, nextMonth = _d.nextMonth;
    var handlePrevMonth = function () {
        if (range) {
            if (monthIndex === 0) {
                prevMonth();
            }
        }
        else {
            prevMonth();
        }
    };
    var handleNextMonth = function () {
        if (range) {
            if (monthIndex === 1) {
                nextMonth();
            }
        }
        else {
            nextMonth();
        }
    };
    return (react_1.default.createElement("div", { className: "xflex xflex-column xflex-datepicker-month" },
        react_1.default.createElement("div", { className: "xflex xflex-justify-content-center xflex-datepicker-month-header" },
            react_1.default.createElement("button", { onClick: handlePrevMonth, className: "xflex-datepicker-left-angle" }, (range && ((monthIndex === 0 && react_1.default.createElement(svg_1.LeftAngle, null)) || react_1.default.createElement("div", null))) || react_1.default.createElement(svg_1.LeftAngle, null)),
            react_1.default.createElement("div", { className: "xflex-datepicker-month-header-title" },
                react_1.default.createElement("strong", null,
                    monthIndex === 0 ? monthLabel : monthLabelNext,
                    " ",
                    monthIndex === 0 ? yearLabel : yearLabelNext)),
            react_1.default.createElement("button", { onClick: handleNextMonth, className: "xflex-datepicker-right-angle" }, (range && ((monthIndex === 1 && react_1.default.createElement(svg_1.RightAngle, null)) || react_1.default.createElement("div", null))) || react_1.default.createElement(svg_1.RightAngle, null))),
        react_1.default.createElement(Weeks_1.default, __assign({}, {
            month: monthIndex,
            range: range,
            numDaysInRange: numDaysInRange,
            updateDaysNumber: updateDaysNumber,
            tooltipLabel: tooltipLabel,
        }))));
};
exports.default = MonthBox;
