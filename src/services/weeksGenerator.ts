import moment from 'moment';
import { generateNumbers } from './generator';

export const generateWeeks = (currentMonth: number, currentYear: number) => {
    let date = moment().month(currentMonth).year(currentYear).date(1);

    let startWeek = date.clone().isoWeekday(1);
    let currentWeekDay = date.clone().isoWeekday(1);

    let endDate = date.clone().endOf('month');

    let weeks = [];

    let weekdays = generateNumbers(1, 8);

    while (startWeek.isBefore(endDate)) {
        let week = [];
        weekdays.forEach(day => {
            currentWeekDay = startWeek.clone().isoWeekday(day);
            week.push(currentWeekDay);
        });
        weeks.push(week);
        startWeek.add(7, 'days');
    }

    while (weeks.length < 6) {
        let week = [];
        weekdays.forEach(day => {
            currentWeekDay = startWeek.clone().isoWeekday(day);
            week.push(currentWeekDay);
        });
        weeks.push(week);
        startWeek.add(7, 'days');
    }

    return weeks;
};
