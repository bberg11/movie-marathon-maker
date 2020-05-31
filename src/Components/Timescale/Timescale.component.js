import React from 'react';
import PropTypes from 'prop-types';

import './Timescale.styles.css';

const Timescale = ({ lengthMode, length }) => {
  if (lengthMode === 'movie') {
    return '';
  }

  const ticks = [];

  for (let i = 1; i < length; i += 1) {
    ticks.push(i);
  }

  return (
    <div className="timescale" style={{ height: length * 2 }}>
      {ticks.map((tick) => (
        <span key={tick} className="timescale__tick">
          {tick}
        </span>
      ))}
    </div>
  );
};

Timescale.propTypes = {
  length: PropTypes.number.isRequired,
  lengthMode: PropTypes.string.isRequired,
};

export default Timescale;
