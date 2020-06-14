import React from 'react';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';

import './ActorCard.styles.scss';
import PosterImage from 'Components/PosterImage/PosterImage.component';

const ActorCard = ({ actor }) => {
  return (
    <div className="actor-card">
      <div className="actor-card__image">
        <PosterImage
          imagePath={actor.profile_path}
          targetSize={342}
          alt={`${actor.name} Profile Pic`}
        />
      </div>
      <div className="actor-card__info">
        <h3 className="actor-card__name heading heading--6 heading--half-margin">
          {actor.name}
        </h3>
        <p className="actor-card__character">{actor.character}</p>
      </div>
    </div>
  );
};

ActorCard.defaultProps = {
  actor: {},
};

ActorCard.propTypes = {
  actor: PropTypes.shape(propShapes.cast),
};

export default ActorCard;
