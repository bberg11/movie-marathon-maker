/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const movies = {
  id: PropTypes.string,
};

export const movie = {
  id: PropTypes.string,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  runtime: PropTypes.number,
};
