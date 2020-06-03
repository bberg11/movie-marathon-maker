import React from 'react';
import PropTypes from 'prop-types';

import './ButtonProperty.styles.scss';

const ButtonProperty = ({
  id,
  label,
  name,
  type,
  value,
  checked,
  changeHandler,
}) => {
  return (
    <div className="button-property">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={changeHandler}
        className="button-property__input"
      />
      <label htmlFor={id} className="button-property__label">
        {label}
      </label>
    </div>
  );
};

ButtonProperty.defaultProps = {
  checked: false,
};

ButtonProperty.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
};

export default ButtonProperty;
