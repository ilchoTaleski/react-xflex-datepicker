"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIAL_STATE = void 0;
var moment_1 = __importDefault(require("moment"));
exports.INITIAL_STATE = {
    startDate: moment_1.default(),
    endDate: moment_1.default(),
    hoveredDate: null,
    locale: 'en',
    inputControl: true,
    position: 'bottom',
    format: 'DD-MM-YYYY',
    placeholder: 'Choose date...',
    buttonControlClassName: null,
    hasTooltip: true,
    tooltipLabel: null,
    currentMonthView: 0,
    currentYearView: 0,
    monthLabel: '',
    yearLabel: '',
    monthLabelNext: '',
    yearLabelNext: '',
    weeks: [],
    range: false,
};
