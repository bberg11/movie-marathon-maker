import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { removeMessage } from 'Redux/flash/flash.actions';

import './Alert.styles.scss';

const Alert = ({ dispatch, index, message }) => {
  let timeoutID;

  const dimiss = () => {
    window.clearTimeout(timeoutID);
    dispatch(removeMessage(index));
  };

  useEffect(() => {
    timeoutID = window.setTimeout(dimiss, 3000);
  }, [index]);

  return (
    <div className={`alert alert--${message.type}`}>
      {message.message}
      <button
        type="button"
        className="button-reset alert__close"
        onClick={dimiss}
      >
        <MdClose className="alert__close-icon" title="Dismiss Message" />
      </button>
    </div>
  );
};

Alert.defaultProps = {
  message: {},
};

Alert.propTypes = {
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default connect(null)(Alert);
