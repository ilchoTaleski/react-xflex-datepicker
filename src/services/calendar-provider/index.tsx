import React, { useContext, useMemo, useReducer } from 'react';
import { calendarReducer } from './local-reducer';
import { IContextProps, IState } from './types';
import { INITIAL_STATE } from './local-constants';
import { IDatepickerProps, IDatepickerRangeProps } from '../..';
import { actionTypes } from './local-actions';
import moment, { Moment } from 'moment';
import { mod } from '../modulus';
import { generateWeeks } from '../weeksGenerator';

const CalendarContext = React.createContext({} as IContextProps);

interface ProviderProps extends IDatepickerProps {
    children?: React.ReactNode;
    range?: boolean;
}

interface ProviderPropsRange extends IDatepickerRangeProps {
    children?: React.ReactNode;
    range?: boolean;
}

export const CalendarProvider = ({
    children,
    initialDate = moment(),
    locale = 'en',
    inputControl = true,
    position = 'bottom',
    placeholder = 'Choose date...',
    format = 'DD-MM-YYYY',
    buttonControlClassName = '',
    range,
}: ProviderProps | ProviderPropsRange) => {
    moment.locale(locale);
    let daysShort = moment.weekdaysShort();
    let first = daysShort.shift();
    daysShort.push(first);

    let weeks = getWeeks(initialDate.month(), initialDate.year());
    const [m, y] = getNextMonthYear(initialDate.month(), initialDate.year());
    let nextWeeks = getWeeks(m, y);

    let reducerState = {
        ...INITIAL_STATE,
        startDate: initialDate,
        endDate: range ? initialDate : null,
        currentMonthView: initialDate.month(),
        currentYearView: initialDate.year(),
        monthLabel: moment().month(initialDate.month()).format('MMMM'),
        yearLabel: moment().year(initialDate.year()).format('YYYY'),
        monthLabelNext: moment().month(m).format('MMMM'),
        yearLabelNext: moment().year(y).format('YYYY'),
        daysShort,
        weeks,
        inputControl,
        position,
        placeholder,
        format,
        buttonControlClassName,
        range,
        nextWeeks,
    };

    const [state, dispatch] = useReducer(calendarReducer, reducerState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <CalendarContext.Provider value={contextValue}>
            <>{children}</>
        </CalendarContext.Provider>
    );
};

const useState = (): IState => {
    const { state } = useContext(CalendarContext);
    return state;
};

const useDispatch = () => {
    const { dispatch } = useContext(CalendarContext);
    return dispatch;
};

const getNextMonthYear = (month: number, year: number) => {
    let nm = +month + 1;
    let m, y;
    if (nm > 11) {
        y = +year + 1;
        m = mod(nm, 12);
    } else {
        y = year;
        m = nm;
    }
    return [m, y];
};

const getPrevMonthYear = (month: number, year: number) => {
    let nm = +month - 1;
    let m, y;
    if (nm < 0) {
        y = +year - 1;
        m = mod(nm, 12);
    } else {
        y = year;
        m = nm;
    }
    return [m, y];
};

const getWeeks = (m: number, y: number) => {
    let generatedWeeks = generateWeeks(m, y);
    let transpose = generatedWeeks[0].map((col, i) => generatedWeeks.map(row => row[i]));
    return transpose;
};

interface CalendarState extends IState {
    nextMonthView?: number;
    nextYearView?: number;
}

export const useCalendarState = (): CalendarState => {
    const state = useState();
    const [m, y] = getNextMonthYear(state.currentMonthView, state.currentYearView);
    return { ...state, nextMonthView: m, nextYearView: y };
};

const useCalendarViewChanges = () => {
    const dispatch = useDispatch();
    const state = useState();
    return {
        setCurrentMonthView: (m: number) => {
            dispatch({ type: actionTypes.SET_MONTH_VIEW, payload: m });
            dispatch({ type: actionTypes.SET_MONTH_LABEL, payload: moment().month(m).format('MMMM') });
        },
        setCurrentYearView: (y: number) => {
            dispatch({ type: actionTypes.SET_YEAR_VIEW, payload: y });
            dispatch({
                type: actionTypes.SET_YEAR_LABEL,
                payload: moment().year(y).format('YYYY'),
            });
        },
        setNextMonthLabel: (m: number) => {
            dispatch({ type: actionTypes.SET_MONTH_LABEL_NEXT, payload: moment().month(m).format('MMMM') });
        },
        setNextYearLabel: (y: number) => {
            dispatch({
                type: actionTypes.SET_YEAR_LABEL_NEXT,
                payload: moment().year(y).format('YYYY'),
            });
        },
    };
};

export const useCalendarActions = () => {
    const dispatch = useDispatch();
    const state = useState();
    const { setCurrentMonthView, setCurrentYearView, setNextMonthLabel, setNextYearLabel } = useCalendarViewChanges();
    return {
        setStartDate: (date: Moment) => {
            dispatch({ type: actionTypes.SET_START_DATE, payload: date });
            if (date && !state.range) {
                setCurrentMonthView(date.month());
                setCurrentYearView(date.year());
                dispatch({ type: actionTypes.SET_WEEKS, payload: getWeeks(date.month(), date.year()) });
                // const [m, y] = getNextMonthYear(date.month(), date.year());
                // setNextMonthLabel(m);
                // setNextYearLabel(y);
                // dispatch({ type: actionTypes.SET_WEEKS_NEXT, payload: getWeeks(m, y) });
            }
        },
        setEndDate: (date: Moment) => dispatch({ type: actionTypes.SET_END_DATE, payload: date }),
        setHoveredDate: (date: Moment) => dispatch({ type: actionTypes.SET_HOVERED_DATE, payload: date }),
        prevMonth: () => {
            const [m, y] = getPrevMonthYear(+state.currentMonthView, +state.currentYearView);
            setCurrentMonthView(m);
            setCurrentYearView(y);
            let weeks = state.weeks;
            let [ml, yl] = [+state.currentMonthView, +state.currentYearView];
            dispatch({ type: actionTypes.SET_WEEKS, payload: getWeeks(m, y) });
            setNextMonthLabel(ml);
            setNextYearLabel(yl);
            dispatch({ type: actionTypes.SET_WEEKS_NEXT, payload: weeks });
        },
        nextMonth: () => {
            const [m, y] = getNextMonthYear(+state.currentMonthView, +state.currentYearView);
            setCurrentMonthView(m);
            setCurrentYearView(y);
            let weeks = state.nextWeeks;
            dispatch({ type: actionTypes.SET_WEEKS, payload: weeks });
            const [nm, ny] = getNextMonthYear(m, y);
            setNextMonthLabel(nm);
            setNextYearLabel(ny);
            dispatch({ type: actionTypes.SET_WEEKS_NEXT, payload: getWeeks(nm, ny) });
        },
        viewIntoStartDate: () => {
            if (state.startDate) {
                setCurrentMonthView(state.startDate.month());
                setCurrentYearView(state.startDate.year());
                dispatch({ type: actionTypes.SET_WEEKS, payload: getWeeks(state.startDate.month(), state.startDate.year()) });
                const [m, y] = getNextMonthYear(state.startDate.month(), state.startDate.year());
                setNextMonthLabel(m);
                setNextYearLabel(y);
                dispatch({ type: actionTypes.SET_WEEKS_NEXT, payload: getWeeks(m, y) });
            }
        },
    };
};
