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
  startDateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};
const timeline = {
  currentLength: PropTypes.number,
  movies: PropTypes.arrayOf(PropTypes.shape(movie)),
  settings: PropTypes.shape(settings),
};

const cast = {
  character: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  profile_path: PropTypes.string,
};

const crew = {
  department: PropTypes.string,
  id: PropTypes.number,
  job: PropTypes.string,
  name: PropTypes.string,
  profile_path: PropTypes.string,
};

const credits = {
  cast: PropTypes.arrayOf(PropTypes.shape(cast)),
  crew: PropTypes.arrayOf(PropTypes.shape(crew)),
};

const ref = {
  current: PropTypes.instanceOf(Element),
};

export default {
  movies,
  movie,
  settings,
  timeline,
  credits,
  cast,
  crew,
  ref,
};
