/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getResults as getResultsAction,
  toggleAutocomplete as toggleAutocompleteAction,
  setQuery as setQueryAction,
} from 'Redux/search/search.actions';
import Autocomplete from 'Components/Autocomplete/Autocomplete.component';

import './SearchForm.styles.css';

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
    <form
      onSubmit={handleSubmit}
      className="section container search-form"
      autoComplete="off"
    >
      <div className="input-field search-form__field">
        <input type="text" id="search" value={query} onChange={handleChange} />
        <label htmlFor="search" className="white-text">
          Search
        </label>
      </div>
      <button
        type="button"
        className="button-reset search-form__clear"
        onClick={handleClear}
      >
        <i className="material-icons">close</i>
      </button>
      <button type="submit" className="hide">
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
