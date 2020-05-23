/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getResults } from 'Redux/search/search.actions';

const SearchForm = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);

    fetchMovies(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchMovies(query);
  };

  return (
    <form onSubmit={handleSubmit} className="section container">
      <div className="input-field">
        <input type="text" id="search" value={query} onChange={handleChange} />
        <label htmlFor="search" className="white-text">
          Search
        </label>
      </div>
      <button type="submit" className="hide">
        Search
      </button>
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
