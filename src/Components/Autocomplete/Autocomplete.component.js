import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieList from 'Components/MovieList/MovieList.component';

import 'Components/Autocomplete/Autocomplete.styles.css';

const Autocomplete = ({ showAutocomplete }) => {
  if (!showAutocomplete) {
    return '';
  }

  return (
    <div className="dropdown-content">
      <MovieList condensed />
    </div>
  );
};

Autocomplete.propTypes = {
  showAutocomplete: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return { showAutocomplete: state.search.showAutocomplete };
};

export default connect(mapStateToProps)(Autocomplete);
