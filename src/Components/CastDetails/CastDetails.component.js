import React from 'react';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import ActorCard from 'Components/ActorCard/ActorCard.component';

import './CastDetails.styles.scss';

const CastDetails = ({ cast }) => {
  if (!cast) {
    return '';
  }

  return (
    <div className="cast-details">
      <h2>Cast</h2>
      <div className="cast-detail__overflow-wrapper">
        <ul className="cast-details__list list-reset">
          {cast.map((castMember) => (
            <li key={castMember.id} className="cast-details__person">
              <ActorCard actor={castMember} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CastDetails.defaultProps = {
  cast: [],
};

CastDetails.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.shape(propShapes.cast)),
};

export default CastDetails;
