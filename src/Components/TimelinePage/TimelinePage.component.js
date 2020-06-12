import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { convertMinutesForDisplay } from 'Constants/utilities';
import { reorderMovies } from 'Redux/timeline/timeline.actions';
import Timescale from 'Components/Timescale/Timescale.component';
import TimelineMovie from 'Components/TimelineMovie/TimelineMovie.component';
import TimelineActions from 'Components/TimelineActions/TimelineActions.component';

import './TimelinePage.styles.scss';

const TimelinePage = ({
  dispatch,
  timeline: {
    currentLength,
    movies,
    settings: { lengthMode, length, padding, startDateTime },
  },
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
          setList={(newState) => dispatch(reorderMovies(newState))}
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
  dispatch: PropTypes.func.isRequired,
  timeline: PropTypes.shape(propShapes.timeline).isRequired,
};

const mapStateToProps = (state) => {
  return { timeline: state.timeline };
};

export default connect(mapStateToProps)(TimelinePage);
