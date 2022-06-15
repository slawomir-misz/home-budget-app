/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function useRefreshToken() {
  const { tokens, setTokens } = useContext(AuthContext);

  const refresh = () => {
    axios.get('/refresh', {
      headers: { Authorization: `Bearer ${tokens.refresh_token}` },
    }).then((response) => {
      setTokens(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };
  return refresh;
}
