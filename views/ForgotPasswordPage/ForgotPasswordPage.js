/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Input, Icon, Button,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Keyboard, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import Logo from '../../components/Logo/Logo';
import axios from '../../api/axios';

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [componentState, setComponentState] = useState({
    loading: false,
    error: '',
  });
  const handleLoginClick = () => {
    console.log(componentState);
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.patch(`/user/resetPassword/${email}`).then((response) => {
      console.log(response);
      setComponentState((prevState) => ({
        ...prevState, loading: false,
      }));
    }).catch((error) => {
      console.log(error);
      setComponentState({
        loading: false,
        error: error.response.data,
      });
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.input_container}>
          <Input
            onChange={(e) => setEmail(e.nativeEvent.text)}
            style={styles.input}
            InputLeftElement={(
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="#3b82f6"
              />
            )}
            placeholder="Email"
          />
        </View>
        <View style={styles.input_container}>
          <Button
            onPress={handleLoginClick}
            style={styles.login_button}
          >
            Send new password
          </Button>
        </View>
        <View style={styles.input_container}>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={styles.register_button}
            variant="outline"
            _text={{
              color: '#3b82f6',
            }}
          >
            Login page
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    width: '80%',
    padding: 10,
  },
  input: {
    height: 50,
  },
  login_button: {
    margin: 0,
    backgroundColor: '#3b82f6',
  },
  register_button: {
    margin: 0,
    borderColor: '#3b82f6',
  },
  forgot_password_container: {
    width: '80%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});
