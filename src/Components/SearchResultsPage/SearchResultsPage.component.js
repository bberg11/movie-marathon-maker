import React from 'react';

import MovieList from 'Components/MovieList/MovieList.component';

import './SearchResultsPage.styles.scss';

const SearchResultsPage = () => {
  return (
    <section className="search-results-page">
      <h1>Search Results Page</h1>
      <MovieList />
    </section>
  );
};

export default SearchResultsPage;
