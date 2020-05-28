import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  return { showAutocomplete: state.search.showAutocomplete };
};

export default connect(mapStateToProps)(Autocomplete);
