import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries for a single medication. Cache key for the medication is based on its unique id (e.g., `medication.6035d321b6ede5b31166b1a1`)
 * @param {*} id Medication id
 * @param {*} token User token
 */
export default function useMedication(id, token) {
  return useQuery(
    ['medication', id],
    () => apiCalls.getMedicationFromID(id, token),
    { enabled: !!token }, // only execute the query if the token exists
  );
}
