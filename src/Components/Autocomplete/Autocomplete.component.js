import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieList from 'Components/MovieList/MovieList.component';

import './Autocomplete.styles.scss';

const Autocomplete = ({ showAutocomplete }) => {
  if (!showAutocomplete) {
    return '';
  }

  return (
    <div className="autocomplete">
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
