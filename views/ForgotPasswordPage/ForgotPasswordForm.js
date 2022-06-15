import React, { useState } from 'react';
import {
  Input, Icon, Button, Text,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from '../../api/axios';
import Result from './Result';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [formInputError, setFormInputError] = useState(false);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });
  const handleLoginClick = () => {
    if (email) {
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
    } else {
      setFormInputError(true);
    }
  };

  const handleInputChange = (text) => {
    setEmail(text);
    setFormInputError(false);
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
          onChange={(e) => handleInputChange(e.nativeEvent.text)}
          style={styles.input}
          isInvalid={formInputError}
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
        {formInputError && (
        <Text p={1} color="danger.500">
          Email is required
        </Text>
        )}
      </View>
      <View style={styles.input_container}>
        <Button
          onPress={handleLoginClick}
          style={styles.button}
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
  input_container: {
    width: '80%',
    padding: 10,
  },
  input: {
    height: 50,
  },
  button: {
    margin: 0,
    backgroundColor: '#3b82f6',
  },
});
