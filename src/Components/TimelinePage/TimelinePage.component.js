import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { convertMinutesForDisplay } from 'Constants/utilities';
import {
  reorderMovies as reorderMoviesAction,
  resetMarathon as resetMarathonAction,
  updatePadding as updatePaddingAction,
} from 'Redux/timeline/timeline.actions';
import Timescale from 'Components/Timescale/Timescale.component';
import TimelineMovie from 'Components/TimelineMovie/TimelineMovie.component';
import Button from 'Components/Button/Button.component';

import './TimelinePage.styles.scss';

const TimelinePage = ({
  timeline: {
    currentLength,
    movies,
    settings: { lengthMode, length, padding },
  },
  reoderMovies,
  reset,
  updatePadding,
}) => {
  return (
    <section className="timeline-page">
      <h1>My Current Marathon</h1>
      <p>
        Current status:{' '}
        {lengthMode === 'time'
          ? `${convertMinutesForDisplay(
              currentLength
            )} out of ${convertMinutesForDisplay(length)}`
          : `${length} out of ${movies.length} movies`}
      </p>
      <p>
        <Button
          type="button"
          modifier="button--danger-color"
          clickHandler={() => reset()}
        >
          Reset
        </Button>

        {lengthMode === 'time' ? (
          <Button
            type="button"
            clickHandler={() => {
              const payload = padding > 0 ? 0 : 'even';
              updatePadding(payload);
            }}
          >
            {padding > 0 ? 'Remove spacing' : 'Evenly space movies'}
          </Button>
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
          height:
            lengthMode === 'time' ? length * config.MINUTE_TO_PIXEL_FACTOR : '',
        }}
      >
        {movies.map((movie) => (
          <TimelineMovie key={movie.id} movie={movie} />
        ))}
      </ReactSortable>
    </section>
  );
};

TimelinePage.propTypes = {
  timeline: PropTypes.shape(propShapes.timeline).isRequired,
  reoderMovies: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  updatePadding: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { timeline: state.timeline };
};

const mapDispatchToProps = (dispatch) => ({
  reoderMovies: (movies) => dispatch(reorderMoviesAction(movies)),
  reset: () => dispatch(resetMarathonAction()),
  updatePadding: (padding) => dispatch(updatePaddingAction(padding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
