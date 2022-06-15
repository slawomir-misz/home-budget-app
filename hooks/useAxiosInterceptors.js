import { useEffect, useContext } from 'react';
import axios from '../api/axios';
import useRefreshToken from './useRefreshToken';
import { AuthContext } from '../contexts/AuthContext';

export default function useAxiosInterceptors() {
  const refresh = useRefreshToken();
  const { tokens } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${tokens.access_token}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [tokens, refresh]);
  return axios;
}
