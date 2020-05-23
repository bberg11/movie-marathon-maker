import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getResults } from 'Redux/search/search.actions';
import { movies } from 'propTypes';
import MovieListItem from 'Components/MovieListItem/MovieListItem.component';

import 'Components/MovieList/MovieList.styles.css';

const MovieList = ({ results, fetchMovies }) => {
  const { query } = useParams();

  useEffect(() => {
    if (Object.keys(results).length > 0 || !query) {
      return;
    }

    fetchMovies(query);
  }, [query, results, fetchMovies]);

  return (
    <ul className="movie-list">
      {Object.values(results).map((movie) => (
        <MovieListItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  results: PropTypes.shape(movies).isRequired,
  fetchMovies: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (query) => dispatch(getResults(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
