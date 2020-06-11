import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Alert from 'Components/Alert/Alert.component';

import './FlashMessages.styles.scss';

const FlashMessages = ({ messages }) => {
  return (
    <div className="flash-messages">
      {messages.map((message, index) => (
        <Alert
          key={`${message.type}-${message.message}`}
          message={message}
          index={index}
        />
      ))}
    </div>
  );
};

FlashMessages.defaultProps = {
  messages: [],
};

FlashMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state) => ({
  messages: state.flash.messages,
});

export default connect(mapStateToProps)(FlashMessages);
