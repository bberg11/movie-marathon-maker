/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { getResults } from './redux/search/search.actions';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

function App(props) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);

    props.getResults(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.getResults(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">Search</label>
        </div>
        <div>
          <input
            type="text"
            id="search"
            value={query}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div>
        {props.results &&
          Object.values(props.results).map((movie) => (
            <div key={movie.id}>
              {movie.poster_path ? (
                <img
                  src={`${TMDB_BASE_IMAGE_URL}/w185${movie.poster_path}`}
                  alt={`${movie.title} Movie Poster`}
                />
              ) : (
                ''
              )}
              <p>{movie.title}</p>
              <p>{movie.overview}</p>
              <p>{movie.runtime}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { results: state.search.results };
}

const mapDispatchToProps = (dispatch) => ({
  getResults: (query) => dispatch(getResults(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
