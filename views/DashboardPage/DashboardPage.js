import { Button, Text } from 'native-base';
import React from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';

export default function DashboardPage() {
  const refresh = useRefreshToken();
  const axios = useAxiosInterceptors();

  const getUsers = () => {
    axios.get('/users').then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <>
      <Text>DashboardPage</Text>
      <Button onPress={() => refresh()}>Refresh token</Button>
      <Text>DashboardPage</Text>
      <Text>DashboardPage</Text>
      <Button onPress={getUsers}>Get users</Button>
    </>
  );
}
