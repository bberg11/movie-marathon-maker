import React, { useState } from 'react';
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
import Drawer from 'Components/Drawer/Drawer.component';
import SettingsForm from 'Components/SettingsForm/SettingsForm.component';

import './TimelinePage.styles.scss';

const TimelinePage = ({
  timeline: {
    currentLength,
    movies,
    settings: { lengthMode, length, padding, startDateTime },
  },
  reoderMovies,
  reset,
  updatePadding,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

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
        <div className="timeline-page__actions">
          <div className="timeline-page__action">
            <Button
              type="button"
              modifier="button--full"
              clickHandler={() => setShowDrawer(!showDrawer)}
            >
              Adjust Settings
            </Button>
          </div>

          {lengthMode === 'time' ? (
            <div className="timeline-page__action">
              <Button
                type="button"
                modifier="button--tertiary-color button--full"
                clickHandler={() => {
                  const payload = padding > 0 ? 0 : 'even';
                  updatePadding(payload);
                }}
              >
                {padding > 0 ? 'Remove spacing' : 'Evenly space movies'}
              </Button>
            </div>
          ) : (
            ''
          )}

          <div className="timeline-page__action">
            <Button
              type="button"
              modifier="button--danger-color button--full"
              clickHandler={() => reset()}
            >
              Reset
            </Button>
          </div>
        </div>

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

      <Drawer visible={showDrawer} closeHandler={() => setShowDrawer(false)}>
        <SettingsForm submitHandler={() => setShowDrawer(false)} />
      </Drawer>
    </>
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
