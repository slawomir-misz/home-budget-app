/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    access_token: '',
    refresh_token: '',
  });
  const [decoded, setDecoded] = useState({});

  useEffect(() => {
    if (tokens.access_token) {
      const decodedToken = jwt_decode(tokens.access_token);
      setDecoded(decodedToken);
    }
  }, [tokens]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ tokens, setTokens, decoded }}>{children}</AuthContext.Provider>
  );
};
