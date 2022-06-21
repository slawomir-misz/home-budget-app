/* eslint-disable linebreak-style */
import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './components/routes/Routes';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Routes />
      </NativeBaseProvider>
    </AuthProvider>
  );
}
