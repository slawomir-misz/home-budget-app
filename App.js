import React from "react";
import { NativeBaseProvider } from "native-base";
import LoginPage from "./views/LoginPage/LoginPage";

export default function App() {
  return (
    <NativeBaseProvider>
     <LoginPage />
    </NativeBaseProvider>
  );
}