/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import './Button.styles.scss';

const Button = ({ children, ...otherProps }) => {
  const Element = otherProps.element || 'button';

  return <Element {...otherProps}>{children}</Element>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
