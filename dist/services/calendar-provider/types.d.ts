import { Moment } from 'moment';
export interface IState {
    startDate?: Moment;
    endDate?: Moment;
    hoveredDate?: Moment;
    selectedDate?: Moment;
    locale?: string;
    inputControl?: boolean;
    position?: 'top' | 'bottom';
    format?: string;
    placeholder?: string;
    buttonControlClassName?: string;
    hasTooltip?: boolean;
    tooltipLabel?: (numberOfNights: number) => string;
    currentMonthView?: number;
    currentYearView?: number;
    daysShort?: Array<string>;
    monthLabel?: string;
    yearLabel?: string;
    monthLabelNext?: string;
    yearLabelNext?: string;
    weeks: Array<Array<Moment>>;
    nextWeeks?: Array<Array<Moment>>;
    range?: boolean;
}
export interface IAction<T = null> {
    type: string;
    payload?: T;
}
export interface IContextProps {
    state: IState;
    dispatch: ({ type }: {
        type: string;
    }) => void;
}
