import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries all the users medications. Cache key is `medications`.
 * @param {*} token User token
 */
export default function useMedications(token) {
  return useQuery(
    'medications',
    () => apiCalls.getMedications(token),
    { enabled: !!token }, // only execute the query if the token exists
  );
}
