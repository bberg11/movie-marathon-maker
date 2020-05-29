/* eslint-disable import/prefer-default-export */
export const convertMinutesForDisplay = (time) => {
  const hours = time / 60;
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);

  let display = `${roundedHours} hours`;

  if (roundedMinutes > 0) {
    display = `${display} ${roundedMinutes} minutes`;
  }

  return display;
};
