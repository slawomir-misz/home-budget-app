import React, { useState, useContext } from 'react';
import {
  Button, View,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import CustomInput from '../../components/CustomInput/CustomInput';
import global from '../../styles/global';
import axios from '../../api/axios';
import Result from '../../components/Result/Result';

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
      {!componentState.loading && componentState.error && <Result error={componentState.error} errorMessage="Check your username or password" /> }
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="login"
          placeholder="Username"
          iconName="account"
          rules={{ required: 'Username is required!' }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="password"
          placeholder="Password"
          iconName="lock"
          rules={{ required: 'Password is required!' }}
          type="password"
        />
      </View>
      <View style={global.default_container}>
        <Button
          onPress={handleSubmit(handleLoginClick)}
          style={global.default_button}
          isLoading={componentState.loading}
          isLoadingText="Logging..."
        >
          Login
        </Button>
      </View>
    </>
  );
}
