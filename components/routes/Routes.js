/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { AuthContext } from '../../contexts/AuthContext';
import LoginPage from '../../views/LoginPage/LoginPage';
import RegisterPage from '../../views/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../views/ForgotPasswordPage/ForgotPasswordPage';
import CardsPage from '../../views/CardsPage/CardsPage';
import ChartsPage from '../../views/ChartsPage/ChartsPage';
import AccountManagePage from '../../views/AccountManagePage/AccountManagePage';
import InfoPage from '../../views/InfoPage/InfoPage';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { tokens } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!tokens.access_token
        ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )
        : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let icon;
                switch (route.name) {
                  case 'Cards':
                    icon = 'credit-card';
                    break;
                  case 'Charts':
                    icon = 'graph';
                    break;
                  case 'AccountManage':
                    icon = 'person';
                    break;
                  case 'Info':
                    icon = 'code';
                    break;
                  default:
                    icon = 'unverified';
                }
                return (
                  <Icon
                    as={Octicons}
                    name={icon}
                    size={5}
                    color={focused ? '#3b82f6' : '#a3a3a3'}
                  />
                );
              },
              tabBarActiveTintColor: '#3b82f6',
              tabBarInactiveTintColor: '#a3a3a3',
            })}
          >
            <Tab.Screen
              name="Cards"
              component={CardsPage}
            />
            <Tab.Screen
              name="Charts"
              component={ChartsPage}
            />
            <Tab.Screen
              name="AccountManage"
              component={AccountManagePage}
            />
            <Tab.Screen
              name="Info"
              component={InfoPage}
            />
          </Tab.Navigator>
        ) }
    </NavigationContainer>
  );
}
