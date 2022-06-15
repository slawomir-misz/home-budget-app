/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function useRefreshToken() {
  const { tokens, setTokens } = useContext(AuthContext);

  const refresh = async () => {
    const res = await axios.get('/refresh', {
      headers: { Authorization: `Bearer ${tokens.refresh_token}` },
    }).then((response) => {
      setTokens(response.data);
      return response.data.access_token;
    }).catch((error) => {
      setTokens({
        access_token: '',
        refresh_token: '',
      });
    });
    return res;
  };
  return refresh;
}
