import { Moment } from 'moment';
interface IWeekdaySquareProps {
    day: Moment;
    month: number;
    handleDayClick?: (day: Moment) => void;
    handleMouseOver?: (day: Moment) => void;
    range: boolean;
    hasTooltip: boolean;
    tooltipLabel: (num: number) => string | number;
    numDaysInRange: number;
    key?: string;
    monthIndex?: number;
}
declare const WeekdaySquare: ({ day, month, handleDayClick, handleMouseOver, range, hasTooltip, tooltipLabel, numDaysInRange, monthIndex, }: IWeekdaySquareProps) => any;
export default WeekdaySquare;
