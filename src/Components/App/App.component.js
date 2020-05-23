import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Header/Header.component';
import HomePage from 'Components/HomePage/HomePage.component';
import AuthPage from 'Components/AuthPage/AuthPage.component';
import AccountPage from 'Components/AccountPage/AccountPage.component';
import TimelinePage from 'Components/TimelinePage/TimelinePage.component';
import SearchResultsPage from 'Components/SearchResultsPage/SearchResultsPage.component';
import MovieDetailPage from 'Components/MovieDetailPage/MovieDetailPage.component';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

function App({ results }) {
  return (
    <div>
      <Header />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/account" exact component={AccountPage} />
        <Route path="/timeline" exact component={TimelinePage} />
        <Route path="/search" exact component={SearchResultsPage} />
        <Route path="/movie/:id" exact component={MovieDetailPage} />
      </Switch>

      <div>
        {results &&
          Object.values(results).map((movie) => (
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

App.defaultProps = {
  results: {},
};
App.propTypes = {
  results: PropTypes.shape({
    id: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    runtime: PropTypes.number,
  }),
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

export default connect(mapStateToProps)(App);
