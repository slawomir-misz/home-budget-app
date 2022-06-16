import React, { useState, useContext } from 'react';
import {
  Input, Icon, Button, Text,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';
import LoginError from './LoginError';

export default function LoginForm() {
  const { setTokens } = useContext(AuthContext);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
  });
  const {
    control,
    handleSubmit,
  } = useForm();
  const [show, setShow] = useState(false);

  const handleLoginClick = (data) => {
    setComponentState({
      loading: true,
      error: false,
    });
    axios
      .post('/login', data)
      .then((response) => {
        setTokens(response.data);
      })
      .catch(() => {
        setComponentState({
          loading: false,
          error: true,
        });
      });
  };

  return (
    <>
      {(!componentState.loading && componentState.error) && <LoginError />}
      <View style={styles.input_container}>
        <Controller
          rules={{ required: 'Username is required' }}
          control={control}
          name="login"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                isInvalid={!!error}
                style={styles.input}
                InputLeftElement={(
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                placeholder="Username"
              />
              {error && (
                <Text p={1} color="danger.500">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </View>
      <View style={styles.input_container}>
        <Controller
          rules={{ required: 'Password is required' }}
          control={control}
          name="password"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                isInvalid={!!error}
                type={show ? 'text' : 'password'}
                InputLeftElement={(
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                InputRightElement={(
                  <Icon
                    as={(
                      <MaterialIcons
                        name={show ? 'visibility' : 'visibility-off'}
                      />
                    )}
                    size={5}
                    mr="2"
                    color="#3b82f6"
                    onPress={() => setShow(!show)}
                  />
                )}
                placeholder="Password"
              />
              {error && (
                <Text p={1} color="danger.500">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </View>
      <View style={styles.input_container}>
        <Button
          onPress={handleSubmit(handleLoginClick)}
          style={styles.login_button}
          isLoading={componentState.loading}
          isLoadingText="Logging..."
        >
          Login
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
