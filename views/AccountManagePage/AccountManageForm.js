import {
  Avatar, Text, View, Input, Icon, Button,
} from 'native-base';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';

const avatar = require('../../assets/avatar.png');

export default function AccountManageForm() {
  const axios = useAxiosInterceptors();
  const {
    control,
    handleSubmit,
    watch,
  } = useForm();
  const password = watch('password');
  const [show, setShow] = useState(false);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handlePasswordChange = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.patch(`/user/password/change?password=${data.password}`).then(() => {
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

  return (
    <View style={styles.container}>
      <Avatar size="lg" source={avatar} style={styles.avatar} />
      <View style={styles.input_container}>
        <Input
          style={styles.input}
          isDisabled
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
      </View>
      <View style={styles.input_container}>
        <Input
          style={styles.input}
          isDisabled
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
        {(!componentState.loading && componentState.result)
          ? <Result error={componentState.error} message="New password is active" />
          : (
            <Button
              onPress={handleSubmit(handlePasswordChange)}
              style={styles.button}
              isLoading={componentState.loading}
              isLoadingText="Changing..."
            >
              Change password
            </Button>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginVertical: 25,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  input_container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  input: {
    height: 50,
  },
  button: {
    margin: 0,
    backgroundColor: '#3b82f6',
  },
});
