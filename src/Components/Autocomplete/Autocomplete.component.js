import React from 'react';
import { connect } from 'react-redux';

import 'Components/Autocomplete/Autocomplete.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const Autocomplete = ({ results }) => {
  if (!results) {
    return '';
  }

  return (
    <div className="dropdown-content">
      {Object.values(results).map((movie) => (
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
  );
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

export default connect(mapStateToProps)(Autocomplete);
