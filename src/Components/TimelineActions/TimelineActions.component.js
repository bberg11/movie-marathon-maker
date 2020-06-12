import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetMarathon, updatePadding } from 'Redux/timeline/timeline.actions';
import Button from 'Components/Button/Button.component';
import Drawer from 'Components/Drawer/Drawer.component';
import SettingsForm from 'Components/SettingsForm/SettingsForm.component';

import './TimelineActions.styles.scss';

const TimelineActions = ({ dispatch, lengthMode, padding }) => {
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
              dispatch(updatePadding(payload));
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
          onClick={() => dispatch(resetMarathon())}
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
  dispatch: PropTypes.func.isRequired,
  lengthMode: PropTypes.string.isRequired,
  padding: PropTypes.number.isRequired,
};

export default connect(null)(TimelineActions);
