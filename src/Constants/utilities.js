/* eslint-disable import/prefer-default-export */
import config from 'Constants/config';

export const convertMinutesForDisplay = (time) => {
  const hours = time / 60;
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);

  let display = roundedHours === 0 ? '' : `${roundedHours} hours`;

  if (roundedMinutes > 0) {
    display = `${display} ${roundedMinutes} minutes`;
  }

  if (display === '') {
    return '0 minutes';
  }

  return display;
};

export const getDisplayTimeFromStart = (startDateTime, minutesToAdd) => {
  const startTime = new Date(startDateTime).getTime();
  const time = startTime + minutesToAdd * 1000 * 60;

  return new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const releaseYear = (dateString) => {
  return new Date(dateString).getFullYear().toString();
};

export const getTheatricalRelease = (releaseDates) => {
  // https://developers.themoviedb.org/3/movies/get-movie-release-dates

  const USReleases = releaseDates.results.find(
    (release) => release.iso_3166_1 === 'US'
  );

  if (!USReleases) {
    return null;
  }

  const theatricalRelease = USReleases.release_dates.find(
    (release) => release.type === 3
  );

  if (!theatricalRelease) {
    return USReleases.release_dates[0];
  }

  return theatricalRelease;
};

export const cardImageSrc = (path) => {
  if (path) {
    return {
      '1x': `${config.TMDB_BASE_IMAGE_URL}/w185${path}`,
      '2x': `${config.TMDB_BASE_IMAGE_URL}/w342${path}`,
    };
  }

  return {
    '1x': config.PLACEHOLDER_IMAGES.CARD_1X,
    '2x': config.PLACEHOLDER_IMAGES.CARD_2X,
  };
};

export const detailImageSrc = (path) => {
  if (path) {
    return {
      '1x': `${config.TMDB_BASE_IMAGE_URL}/w500${path}`,
      '2x': `${config.TMDB_BASE_IMAGE_URL}/w780${path}`,
    };
  }

  return {
    '1x': config.PLACEHOLDER_IMAGES.DETAIL_1X,
    '2x': config.PLACEHOLDER_IMAGES.DETAIL_2X,
  };
};

export const movieAlreadyExists = (addToMarathonButtonData) => {
  const { existingMovies, id } = addToMarathonButtonData;

  return existingMovies.some((existingMovie) => existingMovie.id === id);
};

export const runtimeExceedsLength = (addToMarathonButtonData) => {
  const {
    lengthMode,
    existingMovies,
    targetLength,
    currentLength,
    runtime,
  } = addToMarathonButtonData;

  if (lengthMode === 'movie') {
    return existingMovies.length >= targetLength;
  }

  return currentLength + runtime > targetLength;
};

export const buttonText = (addToMarathonButtonData) => {
  const defaultText = 'Add to marathon';

  if (movieAlreadyExists(addToMarathonButtonData)) {
    return 'Already in your marathon';
  }

  if (runtimeExceedsLength(addToMarathonButtonData)) {
    return `${defaultText} (Will overflow length)`;
  }

  return defaultText;
};

export const buttonClassName = (addToMarathonButtonData) => {
  return runtimeExceedsLength(addToMarathonButtonData)
    ? 'button--secondary-color'
    : '';
};
