import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { removeMessage as removeMessageAction } from 'Redux/flash/flash.actions';

import './Alert.styles.scss';

const Alert = ({ index, message, removeMessage }) => {
  let timeoutID;

  const dimiss = () => {
    window.clearTimeout(timeoutID);
    removeMessage(index);
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
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  removeMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeMessage: (index) => dispatch(removeMessageAction(index)),
});

export default connect(null, mapDispatchToProps)(Alert);
