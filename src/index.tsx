import React from 'react';
import Wrapper from './Wrapper';
import RangeWrapper from './RangeWrapper';
import { IDatepickerProps, IDatepickerRangeProps } from './types';
import { CalendarProvider } from './services/calendar-provider';

const XFlexDatepicker = (props: IDatepickerProps) => {
    return (
        <div>
            <CalendarProvider
                initialDate={props.initialDate}
                locale={props.locale}
                placeholder={props.placeholder}
                position={props.position}
                format={props.format}
                buttonControlClassName={props.buttonControlClassName}
                inputControl={props.inputControl}
                range={false}
            >
                <Wrapper {...props} />
            </CalendarProvider>
        </div>
    );
};

const XFlexDatepickerRange = (props: IDatepickerRangeProps) => {
    return (
        <div>
            <CalendarProvider
                initialDate={props.initialDate}
                locale={props.locale}
                placeholder={props.placeholder}
                position={props.position}
                format={props.format}
                buttonControlClassName={props.buttonControlClassName}
                inputControl={props.inputControl}
                hasTooltip={props.hasTooltip}
                range={true}
            >
                <RangeWrapper {...props} />
            </CalendarProvider>
        </div>
    );
};

export { XFlexDatepicker, XFlexDatepickerRange };
export type { IDatepickerRangeProps, IDatepickerProps };
