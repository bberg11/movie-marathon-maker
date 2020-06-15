import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import propShapes from 'Utilities/propShapes';
import config from 'Utilities/config';
import CrewDepartment from 'Components/CrewDepartment/CrewDepartment.component';

import './CrewDetails.styles.scss';

const CrewDetails = ({ crew, setCrewDetailsHeight }) => {
  const crewDetailsRef = useRef();

  useEffect(() => {
    setCrewDetailsHeight(crewDetailsRef.current.offsetHeight);

    crewDetailsRef.current.addEventListener('transitionend', () => {
      setCrewDetailsHeight(crewDetailsRef.current.offsetHeight);
    });
  });

  if (!crew) {
    return '';
  }

  const sortedDepartments = () => {
    const departments = [
      ...new Set(crew.map((crewMember) => crewMember.department)),
    ];
    const topDepartments = [];
    const otherDepartments = [];

    departments.forEach((department) => {
      if (config.DEPARTMENTS_ORDER.includes(department)) {
        topDepartments.push(department);
      } else {
        otherDepartments.push(department);
      }
    });

    topDepartments.sort((a, b) => {
      return (
        config.DEPARTMENTS_ORDER.indexOf(a) -
        config.DEPARTMENTS_ORDER.indexOf(b)
      );
    });

    return [...topDepartments, ...otherDepartments];
  };

  return (
    <div className="crew-details" ref={crewDetailsRef}>
      <h2>Crew</h2>
      <ul className="detail-credits__crew list-reset">
        {sortedDepartments().map((department) => (
          <li key={department} className="detail-credits__crew-department">
            <CrewDepartment
              department={crew.filter(
                (crewMember) => crewMember.department === department
              )}
              setCrewDetailsHeight={setCrewDetailsHeight}
              forwardRef={crewDetailsRef}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CrewDetails.defaultProps = {
  crew: [],
};

CrewDetails.propTypes = {
  crew: PropTypes.arrayOf(PropTypes.shape(propShapes.crew)),
  setCrewDetailsHeight: PropTypes.func.isRequired,
};

export default CrewDetails;
