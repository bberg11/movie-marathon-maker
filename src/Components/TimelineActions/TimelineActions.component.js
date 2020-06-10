import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  resetMarathon as resetMarathonAction,
  updatePadding as updatePaddingAction,
} from 'Redux/timeline/timeline.actions';
import Button from 'Components/Button/Button.component';
import Drawer from 'Components/Drawer/Drawer.component';
import SettingsForm from 'Components/SettingsForm/SettingsForm.component';

import './TimelineActions.styles.scss';

const TimelineActions = ({ lengthMode, padding, reset, updatePadding }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="timeline-actions">
      <div className="timeline-actions__action">
        <Button
          type="button"
          className="button button--full"
          onClick={() => setShowDrawer(!showDrawer)}
        >
          Adjust Settings
        </Button>
      </div>

      {lengthMode === 'time' ? (
        <div className="timeline-actions__action">
          <Button
            type="button"
            className="button button--tertiary-color button--full"
            onClick={() => {
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

      <div className="timeline-actions__action">
        <Button
          type="button"
          className="button button--danger-color button--full"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </div>

      <Drawer visible={showDrawer} closeHandler={() => setShowDrawer(false)}>
        <SettingsForm submitHandler={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

TimelineActions.propTypes = {
  lengthMode: PropTypes.string.isRequired,
  padding: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  updatePadding: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetMarathonAction()),
  updatePadding: (padding) => dispatch(updatePaddingAction(padding)),
});

export default connect(null, mapDispatchToProps)(TimelineActions);
