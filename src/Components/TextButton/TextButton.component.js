import React from 'react';
import PropTypes from 'prop-types';

import './TextButton.styles.scss';

const TextButton = ({ clickHandler, children }) => {
  return (
    <button type="button" className="text-button" onClick={clickHandler}>
      {children}
    </button>
  );
};

TextButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TextButton;
