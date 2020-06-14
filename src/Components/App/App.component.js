import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import config from 'Constants/config';
import { getTMDBConfig } from 'Redux/tmdb/tmdb.actions';
import Header from 'Components/Header/Header.component';
import HomePage from 'Components/HomePage/HomePage.component';
import AuthPage from 'Components/AuthPage/AuthPage.component';
import AccountPage from 'Components/AccountPage/AccountPage.component';
import TimelinePage from 'Components/TimelinePage/TimelinePage.component';
import SearchResultsPage from 'Components/SearchResultsPage/SearchResultsPage.component';
import MovieDetailPage from 'Components/MovieDetailPage/MovieDetailPage.component';
import FlashMessages from 'Components/FlashMessages/FlashMessages.component';

import './App.styles.scss';

const configIsExpired = (timestamp) => {
  if (!timestamp) {
    return true;
  }

  const now = new Date().getTime();
  const timestampInMilliseconds = new Date(timestamp).getTime();
  const lengthConfigIsGoodFor = 1000 * 60 * 60 * 24 * 7; // 1 week

  return timestampInMilliseconds + lengthConfigIsGoodFor < now;
};

function App({ dispatch, tmdbConfig }) {
  const { timestamp, images } = tmdbConfig;

  useEffect(() => {
    if (configIsExpired(timestamp)) {
      dispatch(getTMDBConfig());
    }
  }, [dispatch, timestamp]);

  useEffect(() => {
    if (!images) {
      return;
    }

    const { base_url: baseUrl, poster_sizes: posterSizes } = images;

    // eslint-disable-next-line prefer-destructuring
    config.TMDB_BASE_IMAGE_URL = baseUrl.split(':')[1];
    config.TMDB_POSTER_SIZES = posterSizes;
  }, [images]);

  return (
    <div className="app">
      <FlashMessages />

      <Header />

      <main className="app__content">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" exact component={AuthPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/timeline" exact component={TimelinePage} />
          <Route path="/search/:query" exact component={SearchResultsPage} />
          <Route path="/movie/:id" exact component={MovieDetailPage} />
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tmdbConfig: PropTypes.shape(propShapes.tmdbConfig).isRequired,
};

const mapStateToProps = (state) => ({
  tmdbConfig: state.tmdb.config,
});

export default connect(mapStateToProps)(App);
