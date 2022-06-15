import React from 'react';
import { Button } from 'native-base';
import {
  Keyboard, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo/Logo';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Logo />
        <LoginForm />
        <View style={styles.input_container}>
          <Button
            onPress={() => navigation.navigate('Register')}
            style={styles.register_button}
            variant="outline"
            _text={{
              color: '#3b82f6',
            }}
          >
            Register
          </Button>
        </View>
        <View style={styles.forgot_password_container}>
          <Button variant="unstyled" onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Button>
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
