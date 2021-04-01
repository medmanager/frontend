import { useQuery } from 'react-query';
import apiCalls from '../utils/api-calls';

/**
 * Queries all the users tracking information. Cache key is `tracking`.
 * @param {*} token User token
 */
export default function useTracking(token) {
  return useQuery(
    'tracking',
    () => apiCalls.getTrackingInfo(token),
    { enabled: !!token, cacheTime: 0, refetchOnMount: true }, // only execute the query if the token exists
  );
}
