/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getResults } from 'Redux/search/search.actions';

import Autocomplete from 'Components/Autocomplete/Autocomplete.component';

const SearchForm = ({ fetchMovies, history }) => {
  const [query, setQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      fetchMovies(query);
      setShowAutocomplete(true);
    }
  }, [query, fetchMovies]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowAutocomplete(false);
    history.push('/search');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="section container"
      autoComplete="off"
    >
      <div className="input-field">
        <input type="text" id="search" value={query} onChange={handleChange} />
        <label htmlFor="search" className="white-text">
          Search
        </label>
      </div>
      <button type="submit" className="hide">
        Search
      </button>

      {showAutocomplete ? <Autocomplete /> : ''}
    </form>
  );
};

SearchForm.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (query) => dispatch(getResults(query)),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchForm));
