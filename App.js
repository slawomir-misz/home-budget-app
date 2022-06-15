/* eslint-disable linebreak-style */
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './components/routes/Routes';

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </AuthProvider>
  );
}
