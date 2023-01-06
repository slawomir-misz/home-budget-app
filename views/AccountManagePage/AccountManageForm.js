import {
  Avatar, View, Input, Icon, Button,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import global from '../../styles/global';
import CustomInput from '../../components/CustomInput/CustomInput';
import { AuthContext } from '../../contexts/AuthContext';

const avatar = require('../../assets/avatar.png');

export default function AccountManageForm() {
  const axios = useAxiosInterceptors();
  const { decoded } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    watch,
  } = useForm();
  const password = watch('password');
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handlePasswordChange = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.patch(`/user/change-password/?password=${data.password}`).then(() => {
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
    <View style={global.default_wrapper}>
      <Avatar size="lg" source={avatar} style={styles.avatar} />
      <View style={global.default_container}>
        <Input
          style={global.default_input}
          isDisabled
          InputLeftElement={(
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="#3b82f6"
            />
                )}
          placeholder={decoded.sub}
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
        {(!componentState.loading && componentState.result)
          ? <Result error={componentState.error} errorMessage="Some error occured" message="New password is active" />
          : (
            <Button
              onPress={handleSubmit(handlePasswordChange)}
              style={global.default_button}
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
});
