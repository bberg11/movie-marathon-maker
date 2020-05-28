import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import {
  removeMovie,
  reorderMovies,
  resetMarathon,
} from 'Redux/timeline/timeline.actions';

import './Timeline.styles.css';

const TimelinePage = ({ timeline, removeMovie, reoderMovies, reset }) => {
  return (
    <div>
      <h1>Timeline Page</h1>
      <p>Target Length: {timeline.targetLength} minutes</p>
      <p>Current Length: {timeline.currentLength} minutes</p>
      <p>
        <button className="btn red" type="button" onClick={() => reset()}>
          Reset
        </button>
      </p>
      <ReactSortable
        className="timeline"
        tag="ul"
        list={timeline.movies}
        setList={(newState) => reoderMovies(newState)}
      >
        {timeline.movies.map((movie, index) => (
          <li
            key={movie.id}
            className={
              index % 2 === 0
                ? 'timeline__movie red lighten-5'
                : 'timeline__movie blue lighten-5'
            }
            style={{ height: movie.runtime }}
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
