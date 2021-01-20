import moment from 'moment';
import { IState } from './types';

export const INITIAL_STATE: IState = {
    startDate: moment(),
    endDate: moment(),
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
