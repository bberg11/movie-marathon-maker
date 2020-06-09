import React from 'react';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import { cardImageSrc } from 'Constants/utilities';

import './ActorCard.styles.scss';

const ActorCard = ({ actor }) => {
  return (
    <div className="actor-card">
      <div className="actor-card__image">
        <img
          srcSet={`${cardImageSrc(actor.profile_path)['1x']} 1x, ${
            cardImageSrc(actor.profile_path)['2x']
          } 2x`}
          src={cardImageSrc(actor.profile_path)['2x']}
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
