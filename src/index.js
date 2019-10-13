import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Wrapper from './Wrapper';
import RangeWrapper from './RangeWrapper';

const XFlexDatepicker = props => {
  return (
    <div>
      <Wrapper {...props} />
    </div>
  );
};

const XFlexDatepickerRange = props => {
  return (
    <div>
      <RangeWrapper {...props} />
    </div>
  );
};

export { XFlexDatepicker, XFlexDatepickerRange };
