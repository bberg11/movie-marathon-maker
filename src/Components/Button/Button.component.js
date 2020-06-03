import React from 'react';
import PropTypes from 'prop-types';

import './Button.styles.scss';

const Button = ({ element, type, modifier, clickHandler, children }) => {
  const Element = element || 'button';

  return (
    <Element
      className={`button ${modifier ? modifier : ''}`}
      type={type}
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
  children: null,
};

Button.propTypes = {
  element: PropTypes.string,
  type: PropTypes.string,
  modifier: PropTypes.string,
  clickHandler: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
