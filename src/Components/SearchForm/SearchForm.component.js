/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

import {
  getResults,
  toggleAutocomplete,
  setQuery,
  updateActiveResultItem,
} from 'Redux/search/search.actions';
import config from 'Utilities/config';
import Autocomplete from 'Components/Autocomplete/Autocomplete.component';
import Button from 'Components/Button/Button.component';

import './SearchForm.styles.scss';

const SearchForm = ({ activeResultItem, dispatch, query }) => {
  const history = useHistory();
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(
          `${config.TMDB_BASE_API_URL}/search/movie?api_key=${config.API_KEY}&query=${query}`
        )
        .then(({ data: { results } }) => {
          let movies = {};

          results.forEach((movie) => {
            movies = {
              ...movies,
              [movie.id]: movie,
            };
          });

          setSearchResults(movies);
        });

      dispatch(toggleAutocomplete(true));
    } else {
      dispatch(toggleAutocomplete(false));
    }
  }, [query, dispatch]);

  const handleChange = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const goToSearchResults = () => {
    dispatch(getResults(query));
    dispatch(setQuery(''));
    dispatch(toggleAutocomplete(false));
    history.push(`/search/${query}`);
  };

  const goToDetail = () => {
    const activeResultItemID = Object.values(searchResults)[activeResultItem]
      .id;

    dispatch(setQuery(''));
    dispatch(toggleAutocomplete(false));
    dispatch(updateActiveResultItem(-1));
    history.push(`/movie/${activeResultItemID}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeResultItem >= 0) {
      goToDetail();

      return;
    }

    goToSearchResults();
  };

  const handleClear = (event) => {
    dispatch(setQuery(''));
    event.target.blur();
  };

  const goToNextResultItem = () => {
    const resultsCount = Object.keys(searchResults).length;

    if (activeResultItem === resultsCount - 1) {
      dispatch(updateActiveResultItem(0));
    } else if (activeResultItem === -1) {
      dispatch(updateActiveResultItem(0));
    } else {
      dispatch(updateActiveResultItem(activeResultItem + 1));
    }
  };

  const goToPreviousResultItem = () => {
    if (activeResultItem <= 0) {
      dispatch(updateActiveResultItem(-1));
    } else {
      dispatch(updateActiveResultItem(activeResultItem - 1));
    }
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
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              dispatch(toggleAutocomplete(false));
              event.target.blur();
            }

            if (event.key === 'ArrowDown') {
              goToNextResultItem();
            }

            if (event.key === 'ArrowUp') {
              goToPreviousResultItem();
            }
          }}
          onFocus={() => {
            if (query.length > 0) {
              dispatch(toggleAutocomplete(true));
            }
          }}
        />
        {query.length ? (
          <button
            type="button"
            className="button-reset search-form__clear"
            onClick={handleClear}
          >
            <MdClose className="search-form__clear-icon">Clear</MdClose>
          </button>
        ) : (
          ''
        )}
      </div>
      <Button
        type="button"
        className="button"
        onClick={(event) => {
          event.preventDefault();
          goToSearchResults();
        }}
      >
        Search
      </Button>

      <Autocomplete results={searchResults} />
    </form>
  );
};

SearchForm.propTypes = {
  activeResultItem: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    query: state.search.query,
    activeResultItem: state.search.activeResultItem,
  };
};

export default connect(mapStateToProps)(SearchForm);
