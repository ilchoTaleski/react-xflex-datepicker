import React from 'react';
import { IState } from './types';
import { IDatepickerProps, IDatepickerRangeProps } from '../..';
import { Moment } from 'moment';
interface ProviderProps extends IDatepickerProps {
    children?: React.ReactNode;
    range?: boolean;
}
interface ProviderPropsRange extends IDatepickerRangeProps {
    children?: React.ReactNode;
    range?: boolean;
}
export declare const CalendarProvider: ({ children, initialDate, locale, inputControl, position, placeholder, format, buttonControlClassName, range, }: ProviderProps | ProviderPropsRange) => any;
interface CalendarState extends IState {
    nextMonthView?: number;
    nextYearView?: number;
}
export declare const useCalendarState: () => CalendarState;
export declare const useCalendarActions: () => {
    setStartDate: (date: Moment) => void;
    setEndDate: (date: Moment) => any;
    setHoveredDate: (date: Moment) => any;
    prevMonth: () => void;
    nextMonth: () => void;
    viewIntoStartDate: () => void;
};
export {};
