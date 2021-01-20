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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MonthBox_1 = __importDefault(require("./containers/MonthBox"));
var CloseIcon_1 = __importDefault(require("./svg/components/CloseIcon"));
var InsideComponent_1 = __importDefault(require("./innerPlugins/InsideComponent"));
var calendar_provider_1 = require("./services/calendar-provider");
var Wrapper = function (_a) {
    var onCalendarHide = _a.onCalendarHide, onCalendarShow = _a.onCalendarShow, onChooseDate = _a.onChooseDate, onClearDate = _a.onClearDate, onMonthDayOver = _a.onMonthDayOver;
    var _b = calendar_provider_1.useCalendarState(), startDate = _b.startDate, inputControl = _b.inputControl, position = _b.position, format = _b.format, placeholder = _b.placeholder, buttonControlClassName = _b.buttonControlClassName;
    var _c = calendar_provider_1.useCalendarActions(), setStartDate = _c.setStartDate, setEndDate = _c.setEndDate, viewIntoStartDate = _c.viewIntoStartDate;
    var _d = __read(react_1.useState(false), 2), calendarVisible = _d[0], setCalendarVisible = _d[1];
    var _e = __read(react_1.useState(0), 2), calendarTopProperty = _e[0], setCalendarTopProperty = _e[1];
    var ic = inputControl;
    if (ic === undefined)
        ic = true;
    react_1.useEffect(function () {
        if (typeof document !== 'undefined') {
            var el = document === null || document === void 0 ? void 0 : document.getElementById('top-property-calendar');
            if (el) {
                setCalendarTopProperty(el.offsetHeight);
            }
        }
        else {
            setCalendarTopProperty(0);
        }
    });
    react_1.useEffect(function () {
        if (onChooseDate && startDate)
            onChooseDate({ date: startDate });
    }, [startDate]);
    var showCalendar = function () {
        viewIntoStartDate();
        setCalendarVisible(true);
        onCalendarShow && onCalendarShow();
    };
    var hideCalendar = function () {
        setCalendarVisible(false);
        onCalendarHide && onCalendarHide();
    };
    var handleCloseDate = function (e) {
        onClearDate &&
            onClearDate({
                date: startDate,
            });
        e.stopPropagation();
        setStartDate(null);
        setEndDate(null);
    };
    var updateDaysNumber = function (day) {
        onMonthDayOver && onMonthDayOver(day);
    };
    if (!inputControl)
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(MonthBox_1.default, __assign({}, {
                updateDaysNumber: updateDaysNumber,
            }, { range: false, monthIndex: 0 }))));
    else
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "xflex-datepicker-control-wrapper" },
                react_1.default.createElement("button", { className: "xflex xflex-justify-content-between xflex-datepicker-control " + buttonControlClassName, onClick: showCalendar },
                    (!startDate && react_1.default.createElement("span", null, placeholder)) || react_1.default.createElement("span", null, startDate.format(format)),
                    startDate && (react_1.default.createElement("span", { style: { width: '20px' }, onClick: handleCloseDate },
                        react_1.default.createElement(CloseIcon_1.default, null)))),
                react_1.default.createElement("div", { id: "top-property-calendar", className: "xflex-datepicker-monthbox-wrapper", style: {
                        top: position === 'top' ? "-" + calendarTopProperty + "px" : 'unset',
                    } }, calendarVisible && (react_1.default.createElement(InsideComponent_1.default, { onOutsideClick: hideCalendar },
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { style: {
                                visibility: position === 'top' ? (calendarTopProperty > 0 ? 'visible' : 'hidden') : 'visible',
                            } },
                            react_1.default.createElement(MonthBox_1.default, __assign({}, {
                                updateDaysNumber: updateDaysNumber,
                            }, { range: false, monthIndex: 0 }))))))))));
};
exports.default = Wrapper;
