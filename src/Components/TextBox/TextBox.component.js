/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import './TextBox.styles.scss';

const TextBox = (props) => {
  return <input {...props} />;
};

export default TextBox;
