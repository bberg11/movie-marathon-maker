import React from 'react';

import MovieList from 'Components/MovieList/MovieList.component';

import 'Components/Autocomplete/Autocomplete.styles.css';

const Autocomplete = () => {
  return (
    <div className="dropdown-content">
      <MovieList />
    </div>
  );
};

export default Autocomplete;
