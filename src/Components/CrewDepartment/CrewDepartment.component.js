import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MdAdd, MdRemove } from 'react-icons/md';

import propShapes from 'Utilities/propShapes';

import './CrewDepartment.styles.scss';

const CrewDepartment = ({ department, forwardRef, setCrewDetailsHeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setCrewDetailsHeight(forwardRef.current.offsetHeight);
  });

  if (!department) {
    return '';
  }

  const topCredits = () => {
    const firstCredit = department[0];

    return department.filter((credit) => credit.job === firstCredit.job);
  };

  const otherCredits = department.filter((credit, index) => {
    const topCreditsCount = topCredits().length;

    return topCreditsCount <= 2 ? index > topCreditsCount - 1 : index > 1;
  });

  const renderCredit = (credit) => {
    return (
      <li key={credit.credit_id} className="crew-department__person">
        <strong>{credit.job}: </strong>
        {credit.name}
      </li>
    );
  };

  const buttonTitle = () => {
    if (otherCredits.length === 0) {
      return '';
    }

    return isExpanded ? 'Show Less' : 'Show More';
  };

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      className={classNames({
        'crew-department': true,
        'crew-department--is-expanded': isExpanded,
      })}
      title={buttonTitle()}
    >
      <div className="crew-department__header">
        {topCredits().map((credit, index) => {
          return index <= 1 ? (
            <p key={credit.credit_id} className="crew-department__person">
              <strong>{credit.job}: </strong>
              {credit.name}
            </p>
          ) : (
            ''
          );
        })}
        {otherCredits.length > 0 ? (
          <div className="crew-department__toggle button-reset">
            {isExpanded ? (
              <MdRemove className="crew-department__icon" />
            ) : (
              <MdAdd className="crew-department__icon" />
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      {otherCredits.length > 0 ? (
        <div className="crew-department__body">
          <ul className="list-reset">{otherCredits.map(renderCredit)}</ul>
        </div>
      ) : (
        ''
      )}
    </button>
  );
};

CrewDepartment.defaultProps = {
  department: [],
};

CrewDepartment.propTypes = {
  department: PropTypes.arrayOf(PropTypes.shape(propShapes.crew)),
  forwardRef: PropTypes.shape(propShapes.ref).isRequired,
  setCrewDetailsHeight: PropTypes.func.isRequired,
};

export default CrewDepartment;
