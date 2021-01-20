import { actionTypes } from './local-actions';
import { IAction, IState } from './types';

export const calendarReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actionTypes.SET_START_DATE:
            return { ...state, startDate: action.payload };
        case actionTypes.SET_END_DATE:
            return { ...state, endDate: action.payload };
        case actionTypes.SET_HOVERED_DATE:
            return { ...state, hoveredDate: action.payload };
        case actionTypes.SET_MONTH_VIEW:
            return { ...state, currentMonthView: action.payload };
        case actionTypes.SET_YEAR_VIEW:
            return { ...state, currentYearView: action.payload };
        case actionTypes.SET_MONTH_LABEL:
            return { ...state, monthLabel: action.payload };
        case actionTypes.SET_YEAR_LABEL:
            return { ...state, yearLabel: action.payload };
        case actionTypes.SET_WEEKS:
            return { ...state, weeks: action.payload };
        case actionTypes.SET_MONTH_LABEL_NEXT:
            return { ...state, monthLabelNext: action.payload };
        case actionTypes.SET_YEAR_LABEL_NEXT:
            return { ...state, yearLabelNext: action.payload };
        case actionTypes.SET_WEEKS_NEXT:
            return { ...state, nextWeeks: action.payload };
        default: {
            throw new Error(`Unhandled type: ${action.type}`);
        }
    }
};
