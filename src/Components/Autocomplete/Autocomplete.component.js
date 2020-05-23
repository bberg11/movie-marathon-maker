import React from 'react';

import 'Components/Autocomplete/Autocomplete.styles.css';
import MovieList from 'Components/MovieList/MovieList.component';

const Autocomplete = () => {
  return (
    <div className="dropdown-content">
      <MovieList />
    </div>
  );
};

export default Autocomplete;
