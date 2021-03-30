import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries for the current user.
 * @param {*} token User token
 */
export default function useCurrentUser(token) {
  return useQuery(
    'currentUser',
    () => apiCalls.getCurrentUser(token),
    { enabled: !!token }, // only execute the query if the token exists
  );
}
