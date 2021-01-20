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
exports.useCalendarActions = exports.useCalendarState = exports.CalendarProvider = void 0;
var react_1 = __importStar(require("react"));
var local_reducer_1 = require("./local-reducer");
var local_constants_1 = require("./local-constants");
var local_actions_1 = require("./local-actions");
var moment_1 = __importDefault(require("moment"));
var modulus_1 = require("../modulus");
var weeksGenerator_1 = require("../weeksGenerator");
var CalendarContext = react_1.default.createContext({});
var CalendarProvider = function (_a) {
    var children = _a.children, _b = _a.initialDate, initialDate = _b === void 0 ? moment_1.default() : _b, _c = _a.locale, locale = _c === void 0 ? 'en' : _c, _d = _a.inputControl, inputControl = _d === void 0 ? true : _d, _e = _a.position, position = _e === void 0 ? 'bottom' : _e, _f = _a.placeholder, placeholder = _f === void 0 ? 'Choose date...' : _f, _g = _a.format, format = _g === void 0 ? 'DD-MM-YYYY' : _g, _h = _a.buttonControlClassName, buttonControlClassName = _h === void 0 ? '' : _h, range = _a.range;
    moment_1.default.locale(locale);
    var daysShort = moment_1.default.weekdaysShort();
    var first = daysShort.shift();
    daysShort.push(first);
    var weeks = getWeeks(initialDate.month(), initialDate.year());
    var _j = __read(getNextMonthYear(initialDate.month(), initialDate.year()), 2), m = _j[0], y = _j[1];
    var nextWeeks = getWeeks(m, y);
    var reducerState = __assign(__assign({}, local_constants_1.INITIAL_STATE), { startDate: initialDate, endDate: range ? initialDate : null, currentMonthView: initialDate.month(), currentYearView: initialDate.year(), monthLabel: moment_1.default().month(initialDate.month()).format('MMMM'), yearLabel: moment_1.default().year(initialDate.year()).format('YYYY'), monthLabelNext: moment_1.default().month(m).format('MMMM'), yearLabelNext: moment_1.default().year(y).format('YYYY'), daysShort: daysShort,
        weeks: weeks,
        inputControl: inputControl,
        position: position,
        placeholder: placeholder,
        format: format,
        buttonControlClassName: buttonControlClassName,
        range: range,
        nextWeeks: nextWeeks });
    var _k = __read(react_1.useReducer(local_reducer_1.calendarReducer, reducerState), 2), state = _k[0], dispatch = _k[1];
    var contextValue = react_1.useMemo(function () {
        return { state: state, dispatch: dispatch };
    }, [state, dispatch]);
    return (react_1.default.createElement(CalendarContext.Provider, { value: contextValue },
        react_1.default.createElement(react_1.default.Fragment, null, children)));
};
exports.CalendarProvider = CalendarProvider;
var useState = function () {
    var state = react_1.useContext(CalendarContext).state;
    return state;
};
var useDispatch = function () {
    var dispatch = react_1.useContext(CalendarContext).dispatch;
    return dispatch;
};
var getNextMonthYear = function (month, year) {
    var nm = +month + 1;
    var m, y;
    if (nm > 11) {
        y = +year + 1;
        m = modulus_1.mod(nm, 12);
    }
    else {
        y = year;
        m = nm;
    }
    return [m, y];
};
var getPrevMonthYear = function (month, year) {
    var nm = +month - 1;
    var m, y;
    if (nm < 0) {
        y = +year - 1;
        m = modulus_1.mod(nm, 12);
    }
    else {
        y = year;
        m = nm;
    }
    return [m, y];
};
var getWeeks = function (m, y) {
    var generatedWeeks = weeksGenerator_1.generateWeeks(m, y);
    var transpose = generatedWeeks[0].map(function (col, i) { return generatedWeeks.map(function (row) { return row[i]; }); });
    return transpose;
};
var useCalendarState = function () {
    var state = useState();
    var _a = __read(getNextMonthYear(state.currentMonthView, state.currentYearView), 2), m = _a[0], y = _a[1];
    return __assign(__assign({}, state), { nextMonthView: m, nextYearView: y });
};
exports.useCalendarState = useCalendarState;
var useCalendarViewChanges = function () {
    var dispatch = useDispatch();
    var state = useState();
    return {
        setCurrentMonthView: function (m) {
            dispatch({ type: local_actions_1.actionTypes.SET_MONTH_VIEW, payload: m });
            dispatch({ type: local_actions_1.actionTypes.SET_MONTH_LABEL, payload: moment_1.default().month(m).format('MMMM') });
        },
        setCurrentYearView: function (y) {
            dispatch({ type: local_actions_1.actionTypes.SET_YEAR_VIEW, payload: y });
            dispatch({
                type: local_actions_1.actionTypes.SET_YEAR_LABEL,
                payload: moment_1.default().year(y).format('YYYY'),
            });
        },
        setNextMonthLabel: function (m) {
            dispatch({ type: local_actions_1.actionTypes.SET_MONTH_LABEL_NEXT, payload: moment_1.default().month(m).format('MMMM') });
        },
        setNextYearLabel: function (y) {
            dispatch({
                type: local_actions_1.actionTypes.SET_YEAR_LABEL_NEXT,
                payload: moment_1.default().year(y).format('YYYY'),
            });
        },
    };
};
var useCalendarActions = function () {
    var dispatch = useDispatch();
    var state = useState();
    var _a = useCalendarViewChanges(), setCurrentMonthView = _a.setCurrentMonthView, setCurrentYearView = _a.setCurrentYearView, setNextMonthLabel = _a.setNextMonthLabel, setNextYearLabel = _a.setNextYearLabel;
    return {
        setStartDate: function (date) {
            dispatch({ type: local_actions_1.actionTypes.SET_START_DATE, payload: date });
            if (date && !state.range) {
                setCurrentMonthView(date.month());
                setCurrentYearView(date.year());
                dispatch({ type: local_actions_1.actionTypes.SET_WEEKS, payload: getWeeks(date.month(), date.year()) });
                // const [m, y] = getNextMonthYear(date.month(), date.year());
                // setNextMonthLabel(m);
                // setNextYearLabel(y);
                // dispatch({ type: actionTypes.SET_WEEKS_NEXT, payload: getWeeks(m, y) });
            }
        },
        setEndDate: function (date) { return dispatch({ type: local_actions_1.actionTypes.SET_END_DATE, payload: date }); },
        setHoveredDate: function (date) { return dispatch({ type: local_actions_1.actionTypes.SET_HOVERED_DATE, payload: date }); },
        prevMonth: function () {
            var _a = __read(getPrevMonthYear(+state.currentMonthView, +state.currentYearView), 2), m = _a[0], y = _a[1];
            setCurrentMonthView(m);
            setCurrentYearView(y);
            var weeks = state.weeks;
            var _b = __read([+state.currentMonthView, +state.currentYearView], 2), ml = _b[0], yl = _b[1];
            dispatch({ type: local_actions_1.actionTypes.SET_WEEKS, payload: getWeeks(m, y) });
            setNextMonthLabel(ml);
            setNextYearLabel(yl);
            dispatch({ type: local_actions_1.actionTypes.SET_WEEKS_NEXT, payload: weeks });
        },
        nextMonth: function () {
            var _a = __read(getNextMonthYear(+state.currentMonthView, +state.currentYearView), 2), m = _a[0], y = _a[1];
            setCurrentMonthView(m);
            setCurrentYearView(y);
            var weeks = state.nextWeeks;
            dispatch({ type: local_actions_1.actionTypes.SET_WEEKS, payload: weeks });
            var _b = __read(getNextMonthYear(m, y), 2), nm = _b[0], ny = _b[1];
            setNextMonthLabel(nm);
            setNextYearLabel(ny);
            dispatch({ type: local_actions_1.actionTypes.SET_WEEKS_NEXT, payload: getWeeks(nm, ny) });
        },
        viewIntoStartDate: function () {
            if (state.startDate) {
                setCurrentMonthView(state.startDate.month());
                setCurrentYearView(state.startDate.year());
                dispatch({ type: local_actions_1.actionTypes.SET_WEEKS, payload: getWeeks(state.startDate.month(), state.startDate.year()) });
                var _a = __read(getNextMonthYear(state.startDate.month(), state.startDate.year()), 2), m = _a[0], y = _a[1];
                setNextMonthLabel(m);
                setNextYearLabel(y);
                dispatch({ type: local_actions_1.actionTypes.SET_WEEKS_NEXT, payload: getWeeks(m, y) });
            }
        },
    };
};
exports.useCalendarActions = useCalendarActions;
