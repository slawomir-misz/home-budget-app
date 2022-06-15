/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    access_token: '',
    refresh_token: '',
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ tokens, setTokens }}>{children}</AuthContext.Provider>
  );
};
