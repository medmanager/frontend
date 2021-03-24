import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries for a single occurrence. Cache key for the occurrence is based on its unique id (e.g., `occurrence.6035d321b6ede5b31166b1a1`)
 * @param {*} id Occurrence id
 * @param {*} token User token
 */
export default function useOccurrence(id, token) {
  return useQuery(
    ['occurrence', id],
    () => apiCalls.getOccurrenceFromID(id, token),
    { enabled: !!token }, // only execute the query if the token exists
  );
}
