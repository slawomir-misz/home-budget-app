import React from 'react';
import { Button } from 'native-base';
import {
  Keyboard, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo/Logo';
import ForgotPasswordForm from './ForgotPasswordForm';
import global from '../../styles/global';

export default function ForgotPasswordPage() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={global.default_wrapper}>
        <Logo />
        <ForgotPasswordForm />
        <View style={global.default_container}>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={global.outline_button}
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
