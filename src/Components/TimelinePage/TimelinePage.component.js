import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import {
  removeMovie,
  reorderMovies,
  resetMarathon,
  updatePadding,
} from 'Redux/timeline/timeline.actions';

import { convertMinutesForDisplay } from 'Constants/utilities';

import Timescale from 'Components/Timescale/Timescale.component';

import './Timeline.styles.css';

const TimelinePage = ({
  timeline: {
    currentLength,
    movies,
    settings: { lengthMode, length, padding },
  },
  removeMovie,
  reoderMovies,
  reset,
  updatePadding,
}) => {
  return (
    <div>
      <h1>Timeline Page</h1>
      <p>
        Target Length:{' '}
        {lengthMode === 'time'
          ? convertMinutesForDisplay(length)
          : `${length} movies`}
      </p>
      <p>
        Current Length:{' '}
        {lengthMode === 'time'
          ? convertMinutesForDisplay(currentLength)
          : `${movies.length} movies`}
      </p>
      <p>
        <button className="btn red" type="button" onClick={() => reset()}>
          Reset
        </button>

        {lengthMode === 'time' ? (
          <button
            className="btn"
            type="button"
            onClick={() => {
              const payload = padding > 0 ? 0 : 'even';
              updatePadding(payload);
            }}
          >
            {padding > 0 ? 'Remove spacing' : 'Evenly space movies'}
          </button>
        ) : (
          ''
        )}
      </p>

      <Timescale lengthMode={lengthMode} length={length} />

      <ReactSortable
        className="timeline"
        tag="ul"
        list={movies}
        setList={(newState) => reoderMovies(newState)}
        style={{
          marginLeft: lengthMode === 'time' ? 25 : '',
          height: lengthMode === 'time' ? length * 2 : '',
        }}
      >
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className={
              index % 2 === 0
                ? 'timeline__movie red lighten-5'
                : 'timeline__movie blue lighten-5'
            }
            style={{
              top: movie.startTime * 2,
              height: movie.runtime * 2,
            }}
          >
            <div className="timeline__movie-content">
              {movie.title}
              <button
                type="button"
                className="button-reset"
                onClick={() => removeMovie(movie.id)}
              >
                <i className="material-icons">remove_circle_outline</i>
              </button>
            </div>
          </li>
        ))}
      </ReactSortable>
    </div>
  );
};

function mapStateToProps(state) {
  return { timeline: state.timeline };
}

const mapDispatchToProps = (dispatch) => ({
  removeMovie: (id) => dispatch(removeMovie(id)),
  reoderMovies: (movies) => dispatch(reorderMovies(movies)),
  reset: () => dispatch(resetMarathon()),
  updatePadding: (padding) => dispatch(updatePadding(padding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
