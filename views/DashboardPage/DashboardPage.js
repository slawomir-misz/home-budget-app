import {
  Button, ScrollView, Text, View,
} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import NavBar from '../../components/NavBar/NavBar';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';

export default function DashboardPage() {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <ScrollView>
        <Text>DashboardPage</Text>
        <Button onPress={getUsers}>Get users</Button>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
