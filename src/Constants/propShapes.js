import PropTypes from 'prop-types';

const movies = {
  id: PropTypes.string,
};
const movie = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  runtime: PropTypes.number,
};
const settings = {
  length: PropTypes.number,
  lengthMode: PropTypes.string,
  padding: PropTypes.number,
  startDateTime: PropTypes.string,
};
const timeline = {
  currentLength: PropTypes.number,
  movies: PropTypes.arrayOf(PropTypes.shape(movie)),
  settings: PropTypes.shape(settings),
};

export default {
  movies,
  movie,
  settings,
  timeline,
};
