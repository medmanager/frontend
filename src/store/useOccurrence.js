import { useQueries } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries for a single dosage occurrence and it's medication. Cache key for the occurrence is based on its unique id (e.g., `occurrence.6035d321b6ede5b31166b1a1`)
 * @param {string} occurrenceId Occurrence id
 * @param {string} medicationId Medication id
 * @param {string} token User token
 */
export default function useOccurrence(occurrenceId, medicationId, token) {
  return useQueries([
    {
      queryKey: ['occurrence', occurrenceId],
      queryFn: () => apiCalls.getOccurrenceFromID(occurrenceId, token),
    },
    {
      queryKey: ['medication', medicationId],
      queryFn: () => apiCalls.getMedicationFromID(medicationId, token),
    },
  ]);
}
