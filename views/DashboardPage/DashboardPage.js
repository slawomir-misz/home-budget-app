/* eslint-disable react/prop-types */
import { Button, Text } from 'native-base';
import React from 'react';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';

export default function DashboardPage({ navigation }) {
  const axios = useAxiosInterceptors();

  const getUsers = () => {
    axios.get('/users').then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
      navigation.navigate('Login');
    });
  };
  return (
    <>
      <Text>DashboardPage</Text>
      <Button onPress={getUsers}>Get users</Button>
    </>
  );
}
