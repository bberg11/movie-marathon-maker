import React from 'react';
import PropTypes from 'prop-types';

import './Button.styles.scss';

const Button = ({
  element,
  type,
  modifier,
  clickHandler,
  disabled,
  children,
}) => {
  const Element = element || 'button';

  return (
    <Element
      className={`button ${modifier || ''}`}
      type={type}
      disabled={disabled}
      onClick={clickHandler}
    >
      {children}
    </Element>
  );
};

Button.defaultProps = {
  element: '',
  type: '',
  modifier: '',
  clickHandler: null,
  disabled: false,
  children: null,
};

Button.propTypes = {
  element: PropTypes.string,
  type: PropTypes.string,
  modifier: PropTypes.string,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
