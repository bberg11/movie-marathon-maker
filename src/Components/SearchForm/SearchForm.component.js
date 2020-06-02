/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';

import {
  getResults as getResultsAction,
  toggleAutocomplete as toggleAutocompleteAction,
  setQuery as setQueryAction,
} from 'Redux/search/search.actions';
import Autocomplete from 'Components/Autocomplete/Autocomplete.component';

import './SearchForm.styles.scss';

const SearchForm = ({ getResults, query, setQuery, toggleAutocomplete }) => {
  const history = useHistory();

  useEffect(() => {
    if (query.length > 0) {
      getResults(query);
      toggleAutocomplete(true);
    } else {
      toggleAutocomplete(false);
    }
  }, [query, getResults, toggleAutocomplete]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setQuery('');
    toggleAutocomplete(false);
    history.push(`/search/${query}`);
  };

  const handleClear = (event) => {
    setQuery('');
    event.target.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
      <div className="search-form__field">
        <label htmlFor="search" className="visually-hidden">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Find a movie to add"
          className="search-form__input"
          value={query}
          onChange={handleChange}
        />
        {query.length ? (
          <button
            type="button"
            className="button-reset search-form__clear"
            onClick={handleClear}
          >
            <MdClose style={{ width: '1.5rem', height: '1.5rem' }}>
              Clear
            </MdClose>
          </button>
        ) : (
          ''
        )}
      </div>
      <button
        type="submit"
        className="button-reset button button--warning search-form__submit"
      >
        Search
      </button>

      <Autocomplete />
    </form>
  );
};

SearchForm.propTypes = {
  getResults: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  toggleAutocomplete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    query: state.search.query,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getResults: (query) => dispatch(getResultsAction(query)),
  setQuery: (query) => dispatch(setQueryAction(query)),
  toggleAutocomplete: (shouldShow) =>
    dispatch(toggleAutocompleteAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
