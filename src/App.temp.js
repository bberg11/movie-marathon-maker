/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const TMDB_BASE_API_URL = 'https://api.themoviedb.org/3';
const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';
const API_KEY = 'c61ec07a6f7727aa86819578ff11a754';

// const API_KEY = 'e3312355';
// const OMDB_BASE_API_URL = 'http://www.omdbapi.com/';

function App() {
  const [query, setQuery] = useState('');
  // const [enhancedResults, setEnhancedResults] = useState();
  const [results, setResults] = useState();

  // const enhanceDetails = ({ data }) => {
  //   setResults({
  //     ...results,
  //     [data.id]: data,
  //   });
  // };

  const formatResults = async ({ data }) => {
    let enhancedResults = [];
    const fullDetailRequests = [];

    for (const movie of data.results) {
      fullDetailRequests.push(
        axios.get(`${TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
      );
    }

    const fullDetailResponses = await Promise.all(fullDetailRequests);

    enhancedResults = fullDetailResponses.map((response) => response.data);

    setResults(enhancedResults);

    // await fullDetailResponses.forEach((fullDetailResponse) => {
    //   console.log(fullDetailResponse.data);
    //   setResults({
    //     ...results,
    //     [fullDetailResponse.data.id]: fullDetailResponse.data,
    //   });
    // });

    // setResults(enhancedResults);

    // data.results.forEach(async (movie) => {
    //   const fullDetails = await axios.get(
    //     `${TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${API_KEY}`
    //   );

    //   formattedResults = {
    //     ...formattedResults,
    //     [movie.id]: fullDetails.data,
    //   };
    // });

    // setResults(formattedResults);
  };

  // useEffect(() => {
  //   if (results) {
  //     Object.keys(results).forEach((id) => {
  //       if (results[id].runtime) {
  //         return;
  //       }

  //       // axios
  //       //   .get(`${TMDB_BASE_API_URL}/movie/${id}?api_key=${API_KEY}`)
  //       //   .then(enhanceDetails);
  //     });
  //   }
  // }, [results]);

  const handleChange = (event) => setQuery(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `${TMDB_BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      )
      .then(formatResults);
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
        {results &&
          results.map((movie) => (
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

export default App;
