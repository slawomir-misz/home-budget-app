import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../contexts/AuthContext';
import LoginPage from '../../views/LoginPage/LoginPage';
import DashboardPage from '../../views/DashboardPage/DashboardPage';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const { tokens } = useContext(AuthContext);
  console.log(tokens);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {tokens.access_token
          ? (
            <Stack.Screen
              name="Dashboard"
              component={DashboardPage}
            />
          )
          : (
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
