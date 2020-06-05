/* eslint-disable import/prefer-default-export */
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
