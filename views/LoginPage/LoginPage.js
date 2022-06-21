import React from 'react';
import { Button } from 'native-base';
import {
  Keyboard, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo/Logo';
import LoginForm from './LoginForm';
import global from '../../styles/global';

export default function LoginPage() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={global.default_wrapper}>
        <Logo />
        <LoginForm />
        <View style={global.default_container}>
          <Button
            onPress={() => navigation.navigate('Register')}
            style={global.outline_button}
            _text={{
              color: '#3b82f6',
            }}
          >
            Register
          </Button>
          <Button
            variant="unstyled"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end' }}
          >
            Forgot Password?
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
