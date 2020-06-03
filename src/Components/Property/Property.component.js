import React from 'react';
import PropTypes from 'prop-types';

import './Property.styles.scss';

const Property = ({ id, label, children }) => {
  return (
    <div className="property">
      <label htmlFor={id} className="property__label">
        {label}
      </label>
      <div className="property__input">{children}</div>
    </div>
  );
};

Property.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Property;
