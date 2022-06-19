import React, { useState } from 'react';
import {
  Input, Icon, Button, Text,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../api/axios';
import RegisterResult from './RegisterResult';

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    watch,
  } = useForm();
  const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_.-]*$/;
  const password = watch('password');
  const [show, setShow] = useState(false);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handleRegisterClick = (data) => {
    console.log(data);
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post('/user/register', {
      login: data.login,
      password: data.password,
      email: data.email,
    }).then(() => {
      setComponentState((prevState) => ({
        ...prevState, loading: false, result: true,
      }));
    }).catch((error) => {
      setComponentState({
        loading: false,
        error: error.response.data,
        result: true,
      });
    });
  };

  if (!componentState.loading && componentState.result) {
    return <RegisterResult error={componentState.error} />;
  }

  return (
    <>
      <View style={styles.input_container}>
        <Controller
          rules={{
            required: 'Username is required',
            minLength: {
              value: 5,
              message: 'Username should have at least 5 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Username should be max 20 charcters long',
            },
            pattern: { value: USERNAME_REGEX, message: 'Username is invalid' },
          }}
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
          rules={{
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
            required: 'Email is required',
          }}
          control={control}
          name="email"
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
                    as={<MaterialIcons name="mail" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                placeholder="Email"
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
        <Controller
          rules={{
            validate: (value) => value === password || 'Passwords do not match',
          }}
          control={control}
          name="password_repeat"
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
                placeholder="Repeat password"
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
          onPress={handleSubmit(handleRegisterClick)}
          style={styles.login_button}
          isLoading={componentState.loading}
          isLoadingText="Registering..."
        >
          Register
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
});
