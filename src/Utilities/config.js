const config = {
  API_KEY: 'c61ec07a6f7727aa86819578ff11a754',
  TMDB_BASE_API_URL: 'https://api.themoviedb.org/3',

  // Set/Updated via App.js from TMDB configuration object
  TMDB_BASE_IMAGE_URL: '//image.tmdb.org/t/p/',

  // Set/Updated via App.js from TMDB configuration object
  TMDB_POSTER_SIZES: [
    'w92',
    'w154',
    'w185',
    'w340',
    'w500',
    'w780',
    'original',
  ],

  PRESET_LENGTHS: [8, 10, 12, 24],

  MINUTE_TO_PIXEL_FACTOR: 2,

  DEPARTMENTS_ORDER: ['Directing', 'Writing', 'Camera'],
};

export default config;
