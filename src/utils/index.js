import SensitiveInfo from 'react-native-sensitive-info';
import { days, KEYCHAIN_SERVICE, SHARED_PERFS, TOKEN_KEY } from './constants';

export { colors as Colors } from './colors';
export * from './constants';

/**
 * Gets the string which should come after a day of the month
 * @param {Number} day Day of the month
 */
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

/**
 * Gets the nth day of the month
 * @param {Date} date Date to compute the nth day from
 */
export const nthDay = (date) => {
  const num = Math.max(Math.floor(date.getDate() / 7), 1);
  return num + nth(num) + ' ' + capitalize(days[date.getDay()]);
};

/**
 * Gets an array of sequential numbers from [1-num]
 * @param {Number} num Max number in the array
 */
export const range = (num) =>
  Array(num)
    .fill(1)
    .map((x, y) => x + y);

/**
 * Capitalizes the first letter of a string
 * @param {*} str String
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatTime = (time) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  return (
    (hours > 12 ? hours - 12 : hours).toString() +
    ':' +
    (minutes.toString().length < 2
      ? '0' + minutes.toString()
      : minutes.toString()) +
    (hours > 12 ? ' PM' : ' AM')
  );
};

const keyChainOptions = {
  sharedPreferencesName: SHARED_PERFS,
  keychainService: KEYCHAIN_SERVICE,
};

/**
 * Gets a sensitive item from storage
 * @param {String} key Storage item key
 */
export async function getSensitiveItem(key) {
  const value = await SensitiveInfo.getItem(key, keyChainOptions);
  return value ? value : null;
}

/**
 * Stores a sensitive item to storage
 * @param {String} key Storage item key
 * @param {*} value Storage item value
 */
export async function setSensitiveItem(key, value) {
  return SensitiveInfo.setItem(key, value, keyChainOptions);
}

/**
 * Removes a sensitive item from storage
 * @param {String} key Storage item key
 */
export async function removeSensitiveItem(key) {
  return SensitiveInfo.deleteItem(key, keyChainOptions);
}

export const getToken = () => getSensitiveItem(TOKEN_KEY);

export const removeToken = () => removeSensitiveItem(TOKEN_KEY);

export const setToken = (value) => setSensitiveItem(TOKEN_KEY, value);
