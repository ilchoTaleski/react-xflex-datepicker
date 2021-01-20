import { Moment, MomentFormatSpecification } from 'moment';
export interface IDatepickerProps {
    initialDate?: Moment;
    locale?: string;
    inputControl?: boolean;
    position?: 'top' | 'bottom';
    format?: MomentFormatSpecification;
    placeholder?: string;
    buttonControlClassName?: string;
    onChooseDate?: (e: {
        date: Moment;
    }) => void;
    onClearDate?: (e: {
        date: Moment;
    }) => void;
    onCalendarShow?: () => void;
    onCalendarHide?: () => void;
    onMonthDayOver?: (e: {
        date: Moment;
    }) => void;
}
export interface IDatepickerRangeProps {
    initialDate?: Moment;
    locale?: string;
    inputControl?: boolean;
    position?: 'top' | 'bottom';
    format?: MomentFormatSpecification;
    placeholder?: string;
    buttonControlClassName?: string;
    onChooseDate?: (e: {
        start: Moment;
        end: Moment;
    }) => void;
    onClearDate?: (e: {
        start: Moment;
        end: Moment;
    }) => void;
    onCalendarShow?: () => void;
    onCalendarHide?: () => void;
    onMonthDayOver?: (e: {
        date: Moment;
    }) => void;
    hasTooltip?: boolean;
    tooltipLabel?: (numberOfNights: number) => string;
}
export interface IWeeksProps {
    weeks?: Array<Array<Moment>>;
    daysShort?: Array<string>;
    month?: number;
    date?: Moment;
    onDateClick?: (day: Moment) => void;
    onChooseEndDate?: (day: Moment) => void;
    range?: boolean;
    onDayOver?: (day: Moment) => void;
    dateHovered?: Moment;
    endDate?: Moment;
    hasTooltip?: boolean;
    numDaysInRange?: number;
    updateDaysNumber?: (day: Moment) => void;
    tooltipLabel?: (num: number) => string | number;
}
export interface IMonthProps {
    monthLabel?: string;
    yearLabel?: string;
    daysShort?: Array<string>;
    prevMonth?: () => void;
    nextMonth?: () => void;
    weeks?: Array<Array<Moment>>;
    currentMonthView?: number;
    onDateClick?: (day: Moment) => void;
    selectedDate?: Moment;
    range?: boolean;
    onDayOver?: (day: Moment) => void;
    dateHovered?: Moment;
    onChooseEndDate?: (day: Moment) => void;
    endDate?: Moment;
    monthIndex?: number;
    hasTooltip?: boolean;
    numDaysInRange?: number;
    updateDaysNumber?: (day: Moment) => void;
    tooltipLabel?: (num: number) => string | number;
}
