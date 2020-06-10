/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import './ButtonProperty.styles.scss';

const ButtonProperty = ({ label, id, ...otherProps }) => {
  return (
    <div className="button-property">
      <input id={id} className="button-property__input" {...otherProps} />
      <label htmlFor={id} className="button-property__label">
        {label}
      </label>
    </div>
  );
};

ButtonProperty.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ButtonProperty;
