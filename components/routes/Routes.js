/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Button, Icon, IconButton } from 'native-base';
import { AuthContext } from '../../contexts/AuthContext';
import LoginPage from '../../views/LoginPage/LoginPage';
import RegisterPage from '../../views/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../views/ForgotPasswordPage/ForgotPasswordPage';
import CardsPage from '../../views/CardsPage/CardsPage';
import ChartsPage from '../../views/ChartsPage/ChartsPage';
import AccountManagePage from '../../views/AccountManagePage/AccountManagePage';
import InfoPage from '../../views/InfoPage/InfoPage';
import AddCardPage from '../../views/AddCardPage/AddCardPage';
import { CardsProvider } from '../../contexts/CardsContext';
import LogoutPage from '../../views/LogoutPage/LogoutPage';
import { TransactionsProvider } from '../../contexts/TransactionsContext';
import AddTransactionPage from '../../views/AddTransactionPage/AddTransactionPage';

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Cards':
              icon = 'credit-card';
              break;
            case 'Charts':
              icon = 'graph';
              break;
            case 'Account':
              icon = 'person';
              break;
            case 'Info':
              icon = 'code';
              break;
            case 'Logout':
              icon = 'sign-out';
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
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Cards"
        component={CardsPage}
        options={{
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('AddCard')}
              icon={(
                <Icon
                  as={MaterialCommunityIcons}
                  name="credit-card-plus-outline"
                  size={6}
                  color="#548BF5"
                />
)}
            />
          ),
        }}
      />
      <Tab.Screen name="Charts" component={ChartsPage} />
      <Tab.Screen name="Account" component={AccountManagePage} />
      <Tab.Screen
        name="Info"
        component={InfoPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const { tokens } = useContext(AuthContext);

  if (!tokens.access_token) {
    return (
      <NavigationContainer>
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
      </NavigationContainer>
    );
  }
  return (
    <CardsProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="AddCard" component={AddCardPage} />
            <Stack.Screen name="AddTransaction" component={AddTransactionPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionsProvider>
    </CardsProvider>
  );
}
