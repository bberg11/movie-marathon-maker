import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Header/Header.component';
import HomePage from 'Components/HomePage/HomePage.component';
import AuthPage from 'Components/AuthPage/AuthPage.component';
import AccountPage from 'Components/AccountPage/AccountPage.component';
import TimelinePage from 'Components/TimelinePage/TimelinePage.component';
import SearchResultsPage from 'Components/SearchResultsPage/SearchResultsPage.component';
import MovieDetailPage from 'Components/MovieDetailPage/MovieDetailPage.component';
import FlashMessages from 'Components/FlashMessages/FlashMessages.component';

import './App.styles.scss';

function App() {
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

export default App;
