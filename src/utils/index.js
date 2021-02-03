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
  return num + nth(num) + ' ' + days[date.getDay()];
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const range = (num) =>
  Array(num)
    .fill(1)
    .map((x, y) => x + y);
