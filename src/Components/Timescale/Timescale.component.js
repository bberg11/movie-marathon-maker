import React from 'react';
import PropTypes from 'prop-types';

import { getDisplayTimeFromStart } from 'Constants/utilities';

import './Timescale.styles.scss';

const Timescale = ({ length, startDateTime }) => {
  const ticks = [];

  for (let i = 1; i < length; i += 1) {
    ticks.push(i);
  }

  return (
    <div className="timescale" style={{ height: length * 2 }}>
      {ticks.map((tick, index) => {
        if (index % 5 === 0) {
          return (
            <span key={tick} className="timescale__tick">
              <span className="timescale__time">
                {getDisplayTimeFromStart(startDateTime, tick - 1)}
              </span>
            </span>
          );
        }

        return '';
      })}
      <span className="timescale__tick">
        <span className="timescale__time">
          {getDisplayTimeFromStart(startDateTime, ticks.length + 1)}
        </span>
      </span>
    </div>
  );
};

Timescale.propTypes = {
  length: PropTypes.number.isRequired,
  startDateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};

export default Timescale;
