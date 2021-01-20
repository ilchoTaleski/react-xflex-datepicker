"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWeeks = void 0;
var moment_1 = __importDefault(require("moment"));
var generator_1 = require("./generator");
var generateWeeks = function (currentMonth, currentYear) {
    var date = moment_1.default().month(currentMonth).year(currentYear).date(1);
    var startWeek = date.clone().isoWeekday(1);
    var currentWeekDay = date.clone().isoWeekday(1);
    var endDate = date.clone().endOf('month');
    var weeks = [];
    var weekdays = generator_1.generateNumbers(1, 8);
    var _loop_1 = function () {
        var week = [];
        weekdays.forEach(function (day) {
            currentWeekDay = startWeek.clone().isoWeekday(day);
            week.push(currentWeekDay);
        });
        weeks.push(week);
        startWeek.add(7, 'days');
    };
    while (startWeek.isBefore(endDate)) {
        _loop_1();
    }
    var _loop_2 = function () {
        var week = [];
        weekdays.forEach(function (day) {
            currentWeekDay = startWeek.clone().isoWeekday(day);
            week.push(currentWeekDay);
        });
        weeks.push(week);
        startWeek.add(7, 'days');
    };
    while (weeks.length < 6) {
        _loop_2();
    }
    return weeks;
};
exports.generateWeeks = generateWeeks;
