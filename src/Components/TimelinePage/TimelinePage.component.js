import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import {
  removeMovie,
  reorderMovies,
  resetMarathon,
} from 'Redux/timeline/timeline.actions';

import { convertMinutesForDisplay } from 'utilities';

import Timescale from 'Components/Timescale/Timescale.component';

import './Timeline.styles.css';

const TimelinePage = ({ timeline, removeMovie, reoderMovies, reset }) => {
  return (
    <div>
      <h1>Timeline Page</h1>
      <p>
        Target Length:{' '}
        {timeline.settings.lengthMode === 'time'
          ? convertMinutesForDisplay(timeline.settings.length)
          : `${timeline.settings.length} movies`}
      </p>
      <p>
        Current Length:{' '}
        {timeline.settings.lengthMode === 'time'
          ? convertMinutesForDisplay(timeline.currentLength)
          : `${timeline.movies.length} movies`}
      </p>
      <p>
        <button className="btn red" type="button" onClick={() => reset()}>
          Reset
        </button>
      </p>

      <Timescale
        lengthMode={timeline.settings.lengthMode}
        length={timeline.settings.length}
      />

      <ReactSortable
        className="timeline"
        tag="ul"
        list={timeline.movies}
        setList={(newState) => reoderMovies(newState)}
        style={{
          marginLeft: timeline.settings.lengthMode === 'time' ? 25 : '',
        }}
      >
        {timeline.movies.map((movie, index) => (
          <li
            key={movie.id}
            className={
              index % 2 === 0
                ? 'timeline__movie red lighten-5'
                : 'timeline__movie blue lighten-5'
            }
            style={{ height: movie.runtime * 2 }}
          >
            {movie.title}
            <button
              type="button"
              className="button-reset"
              onClick={() => removeMovie(movie.id)}
            >
              <i className="material-icons">remove_circle_outline</i>
            </button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
