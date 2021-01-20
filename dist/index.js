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
exports.XFlexDatepickerRange = exports.XFlexDatepicker = void 0;
var react_1 = __importDefault(require("react"));
var Wrapper_1 = __importDefault(require("./Wrapper"));
var RangeWrapper_1 = __importDefault(require("./RangeWrapper"));
var calendar_provider_1 = require("./services/calendar-provider");
var XFlexDatepicker = function (props) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(calendar_provider_1.CalendarProvider, { initialDate: props.initialDate, locale: props.locale, placeholder: props.placeholder, position: props.position, format: props.format, buttonControlClassName: props.buttonControlClassName, inputControl: props.inputControl, range: false },
            react_1.default.createElement(Wrapper_1.default, __assign({}, props)))));
};
exports.XFlexDatepicker = XFlexDatepicker;
var XFlexDatepickerRange = function (props) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(calendar_provider_1.CalendarProvider, { initialDate: props.initialDate, locale: props.locale, placeholder: props.placeholder, position: props.position, format: props.format, buttonControlClassName: props.buttonControlClassName, inputControl: props.inputControl, hasTooltip: props.hasTooltip, range: true },
            react_1.default.createElement(RangeWrapper_1.default, __assign({}, props)))));
};
exports.XFlexDatepickerRange = XFlexDatepickerRange;
