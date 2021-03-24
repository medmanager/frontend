import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries for a single occurrence group. Cache key for the occurrence group is based on its unique id (e.g., `occurrenceGroup.6035d321b6ede5b31166b1a1`)
 * @param {*} id Occurrence id
 * @param {*} token User token
 */
export default function useOccurrenceGroup(id, token) {
  return useQuery(
    ['occurrenceGroup', id],
    () => apiCalls.getOccurrenceGroupFromID(id, token),
    { enabled: !!token }, // only execute the query if the token exists
  );
}
