const config = {
  API_KEY: 'c61ec07a6f7727aa86819578ff11a754',
  TMDB_BASE_API_URL: 'https://api.themoviedb.org/3',

  // TODO: Get this from TMDB config endpoint
  // `/configuration?api_key=${API_KEY}`
  TMDB_BASE_IMAGE_URL: '//image.tmdb.org/t/p',

  PRESET_LENGTHS: [8, 10, 12, 24],

  PLACEHOLDER_IMAGES: {
    CARD_1X: 'https://via.placeholder.com/185x278?text=Image%0AUnavailable',
    CARD_2X: 'https://via.placeholder.com/342x513?text=Image%0AUnavailable',
    DETAIL_1X: 'https://via.placeholder.com/185x278?text=Image%0AUnavailable',
    DETAIL_2X: 'https://via.placeholder.com/780X1170?text=Image%0AUnavailable',
  },

  MINUTE_TO_PIXEL_FACTOR: 2,

  DEPARTMENTS_ORDER: ['Directing', 'Writing', 'Camera'],
};

export default config;
