/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getResults } from 'Redux/search/search.actions';

import Autocomplete from 'Components/Autocomplete/Autocomplete.component';

const SearchForm = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 0) {
      fetchMovies(query);
    }
  }, [query, fetchMovies]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchMovies(query);
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

      <Autocomplete />
    </form>
  );
};

SearchForm.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (query) => dispatch(getResults(query)),
});

export default connect(null, mapDispatchToProps)(SearchForm);
