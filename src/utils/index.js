import { days } from './constants';

export { colors as Colors } from './colors';
export * from './constants';

export const nth = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const nthDay = (date) => {
  const num = Math.max(Math.floor(date.getDate() / 7), 1);
  return num + nth(num) + ' ' + capitalize(days[date.getDay()]);
};

export const range = (num) =>
  Array(num)
    .fill(1)
    .map((x, y) => x + y);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getSelectedDays = (customFrequency) =>
  Object.entries(customFrequency.weekdays || {})
    .filter(([key, value]) => !!value) // only get days which are marked as true
    .map(([key, value]) => key);

export const getStatusText = (customFrequency) => {
  if (customFrequency.intervalUnits === 'days') {
    if (customFrequency.interval === 1) {
      return 'Every day';
    } else {
      return `Every ${customFrequency.interval} days`;
    }
  } else {
    const selectedDays = getSelectedDays(customFrequency);
    const selectedDaysShort = selectedDays.map((day) =>
      (day.charAt(0).toUpperCase() + day.slice(1)).substring(0, 3),
    );

    if (customFrequency.interval === 1) {
      return `Weekly on ${selectedDaysShort.join(', ')}`;
    } else {
      return `Every ${
        customFrequency.interval
      } weeks on ${selectedDaysShort.join(', ')}`;
    }
  }
};
