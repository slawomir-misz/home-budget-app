import React, { useState } from 'react';
import { Button, View } from 'native-base';
import { useForm } from 'react-hook-form';
import axios from '../../api/axios';
import global from '../../styles/global';
import CustomInput from '../../components/CustomInput/CustomInput';
import Result from '../../components/Result/Result';

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    watch,
  } = useForm();
  const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_.-]*$/;
  const password = watch('password');
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handleRegisterClick = (data) => {
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
        error: error.response.data.message,
        result: true,
      });
    });
  };

  if (!componentState.loading && componentState.result) {
    return <Result errorMessage={componentState.error} message="Registered Successfully" />;
  }

  return (
    <>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="login"
          placeholder="Username"
          iconName="account"
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
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="email"
          placeholder="Email"
          iconName="email"
          rules={{
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
            required: 'Email is required',
          }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="password"
          placeholder="Password"
          iconName="lock"
          rules={{ required: 'Password is required' }}
          type="password"
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="password_repeat"
          placeholder="Repeat Password"
          iconName="lock"
          rules={{
            validate: (value) => value === password || 'Passwords do not match',
          }}
          type="password"
        />
      </View>
      <View style={global.default_container}>
        <Button
          onPress={handleSubmit(handleRegisterClick)}
          style={global.default_button}
          isLoading={componentState.loading}
          isLoadingText="Registering..."
        >
          Register
        </Button>
      </View>
    </>
  );
}
