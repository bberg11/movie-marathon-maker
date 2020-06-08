import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { convertMinutesForDisplay } from 'Constants/utilities';
import { reorderMovies as reorderMoviesAction } from 'Redux/timeline/timeline.actions';
import Timescale from 'Components/Timescale/Timescale.component';
import TimelineMovie from 'Components/TimelineMovie/TimelineMovie.component';
import TimelineActions from 'Components/TimelineActions/TimelineActions.component';

import './TimelinePage.styles.scss';

const TimelinePage = ({
  timeline: {
    currentLength,
    movies,
    settings: { lengthMode, length, padding, startDateTime },
  },
  reoderMovies,
}) => {
  return (
    <>
      <section className="timeline-page">
        <h1>My Current Marathon</h1>
        <p className="timeline-page__summary">
          Marathon Status:{' '}
          {lengthMode === 'time'
            ? `${movies.length} movies | ${convertMinutesForDisplay(
                length - currentLength
              )} available`
            : `${
                movies.length
              } out of ${length} movies | ${convertMinutesForDisplay(
                currentLength
              )} long`}
        </p>

        <TimelineActions lengthMode={lengthMode} padding={padding} />

        <Timescale
          lengthMode={lengthMode}
          length={lengthMode === 'movie' ? currentLength : length}
          startDateTime={startDateTime}
        />

        <ReactSortable
          className="timeline"
          tag="ul"
          list={movies}
          setList={(newState) => reoderMovies(newState)}
          style={{
            height:
              lengthMode === 'time'
                ? length * config.MINUTE_TO_PIXEL_FACTOR
                : '',
          }}
        >
          {movies.map((movie) => (
            <TimelineMovie
              key={movie.id}
              movie={movie}
              startDateTime={startDateTime}
            />
          ))}
        </ReactSortable>
      </section>
    </>
  );
};

TimelinePage.propTypes = {
  timeline: PropTypes.shape(propShapes.timeline).isRequired,
  reoderMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { timeline: state.timeline };
};

const mapDispatchToProps = (dispatch) => ({
  reoderMovies: (movies) => dispatch(reorderMoviesAction(movies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
