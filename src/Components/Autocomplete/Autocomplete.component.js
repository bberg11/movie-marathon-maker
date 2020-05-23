import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { movies } from 'propTypes';
import 'Components/Autocomplete/Autocomplete.styles.css';
import MovieList from 'Components/MovieList/MovieList.component';

const Autocomplete = ({ results }) => {
  if (!results) {
    return '';
  }

  return (
    <div className="dropdown-content">
      <MovieList />
    </div>
  );
};

Autocomplete.defaultProps = {
  results: {},
};
Autocomplete.propTypes = {
  results: PropTypes.shape(movies),
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

export default connect(mapStateToProps)(Autocomplete);
