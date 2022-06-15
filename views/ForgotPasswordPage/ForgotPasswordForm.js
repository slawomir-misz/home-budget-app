import React, { useState } from 'react';
import {
  Input, Icon, Button,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from '../../api/axios';
import Result from './Result';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });
  const handleLoginClick = () => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.patch(`/user/resetPassword/${email}`).then(() => {
      setComponentState((prevState) => ({
        ...prevState, loading: false, result: true,
      }));
    }).catch(() => {
      setComponentState({
        loading: false,
        error: true,
        result: true,
      });
    });
  };

  if (!componentState.loading && componentState.result) {
    return (
      <Result email={email} error={componentState.error} />
    );
  }

  return (
    <>
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
          isLoading={componentState.loading}
          isLoadingText="Sending..."
        >
          Send new password
        </Button>
      </View>
    </>
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
