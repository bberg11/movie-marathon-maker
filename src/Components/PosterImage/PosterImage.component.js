import React from 'react';
import PropTypes from 'prop-types';

import { posterImageSources } from 'Constants/utilities';
import NoImage from 'Components/NoImage/NoImage.component';

import './PosterImage.styles.scss';

const PosterImage = ({ alt, className, imagePath, targetSize }) => {
  const imageSources = posterImageSources(imagePath, targetSize);

  if (!imagePath) {
    return <NoImage />;
  }

  return (
    <img
      srcSet={`${imageSources['1x']} 1x, ${imageSources['2x']} 2x`}
      src={imageSources['2x']}
      alt={alt}
      className={className}
    />
  );
};

PosterImage.defaultProps = {
  className: '',
  imagePath: null,
};

PosterImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  imagePath: PropTypes.string,
  targetSize: PropTypes.number.isRequired,
};

export default PosterImage;
