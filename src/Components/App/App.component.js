import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Header/Header.component';
import HomePage from 'Components/HomePage/HomePage.component';
import AuthPage from 'Components/AuthPage/AuthPage.component';
import AccountPage from 'Components/AccountPage/AccountPage.component';
import TimelinePage from 'Components/TimelinePage/TimelinePage.component';
import SearchResultsPage from 'Components/SearchResultsPage/SearchResultsPage.component';
import MovieDetailPage from 'Components/MovieDetailPage/MovieDetailPage.component';

function App() {
  return (
    <div>
      <Header />

      <main className="container">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" exact component={AuthPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/timeline" exact component={TimelinePage} />
          <Route path="/search" exact component={SearchResultsPage} />
          <Route path="/movie/:id" exact component={MovieDetailPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
