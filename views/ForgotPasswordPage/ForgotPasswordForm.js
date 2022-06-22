import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'native-base';
import { View } from 'react-native';
import axios from '../../api/axios';
import CustomInput from '../../components/CustomInput/CustomInput';
import global from '../../styles/global';
import Result from '../../components/Result/Result';

export default function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
  } = useForm();
  const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    errorMessage: '',
    result: false,
  });

  const handleSendClick = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.patch(`/user/password/reset/${data.email}`).then(() => {
      setComponentState((prevState) => ({
        ...prevState, loading: false, result: true,
      }));
    }).catch((error) => {
      setComponentState({
        loading: false,
        errorMessage: error.response.data.message,
        error: true,
        result: true,
      });
    });
  };

  if (!componentState.loading && componentState.result) {
    return (
      <Result error={componentState.error} errorMessage={componentState.errorMessage} message="New password was sent to your email" />
    );
  }

  return (
    <>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="email"
          placeholder="Email"
          iconName="email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <Button
          onPress={handleSubmit(handleSendClick)}
          style={global.default_button}
          isLoading={componentState.loading}
          isLoadingText="Sending..."
        >
          Send new password
        </Button>
      </View>
    </>
  );
}
