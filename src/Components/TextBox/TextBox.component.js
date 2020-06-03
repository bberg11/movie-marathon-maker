import React from 'react';
import PropTypes from 'prop-types';

import './TextBox.styles.scss';

const TextBox = ({ id, name, type, value, changeHandler, modifier }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      name={name}
      onChange={changeHandler}
      className={`text-box ${modifier ? modifier : ''}`}
    />
  );
};

TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeHandler: PropTypes.func.isRequired,
};

export default TextBox;
