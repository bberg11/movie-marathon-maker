import React from 'react';

import './Timescale.styles.css';

const Timescale = ({ lengthMode, length }) => {
  if (lengthMode === 'movie') {
    return '';
  }

  const ticks = [];

  for (let i = 1; i < length; i++) {
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

export default Timescale;
