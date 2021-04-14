import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries all the users dosage occurrences. Cache key is `occurrences`.
 * @param {*} token User token
 */
export default function useOccurrences(token) {
  return useQuery(
    'occurrences',
    () => apiCalls.getCalendarOccurrences(token),
    { retry: 3, enabled: !!token }, // only execute the query if the token exists
  );
}
