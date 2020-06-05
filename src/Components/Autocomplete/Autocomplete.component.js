import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import MovieList from 'Components/MovieList/MovieList.component';

import './Autocomplete.styles.scss';

const Autocomplete = ({ results, showAutocomplete }) => {
  if (!showAutocomplete) {
    return '';
  }

  return (
    <div className="autocomplete">
      <MovieList results={results} condensed />
    </div>
  );
};

Autocomplete.defaultProps = {
  results: {},
};

Autocomplete.propTypes = {
  results: PropTypes.shape(propShapes.movies),
  showAutocomplete: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return { showAutocomplete: state.search.showAutocomplete };
};

export default connect(mapStateToProps)(Autocomplete);
