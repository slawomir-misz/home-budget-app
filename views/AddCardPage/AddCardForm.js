/* eslint-disable no-unused-vars */
import {
  Button, Icon, Input, Text, View, Select,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';

export default function AddCardForm() {
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });
  const [cardDetails, setCardDetails] = useState({
    balance: 0,
    cardNumber: '0000',
    type: 'Card',
    name: 'Default',
  });
  const { control, handleSubmit } = useForm();
  const axios = useAxiosInterceptors();

  const handleSaveButton = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post('/card/save', {
      cardNumber: data.number,
      name: data.name,
      type: data.type,
      balance: data.balance,
    }).then((response) => {
      setComponentState((prevState) => ({
        ...prevState, loading: false, result: true,
      }));
      setCardDetails({
        cardNumber: data.number,
        name: data.name,
        type: data.type,
        balance: data.balance,
      });
    }).catch((error) => {
      setComponentState({
        loading: false,
        error: true,
        errorMessage: error.response.data.message,
        result: true,
      });
    });
  };
  return (
    <>
      <Card
        balance={cardDetails.balance}
        cardNumber={cardDetails.cardNumber}
        type={cardDetails.type}
        name={cardDetails.name}
      />
      <View style={styles.input_container}>
        <Controller
          rules={{ required: 'Card name is required' }}
          control={control}
          name="name"
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
                    as={<MaterialIcons name="short-text" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                placeholder="Card Name"
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
          rules={{ required: 'Last card numbers is required' }}
          control={control}
          name="number"
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
                keyboardType="numeric"
                InputLeftElement={(
                  <Icon
                    as={<MaterialIcons name="more-horiz" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                placeholder="Last card 4 numbers"
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
          control={control}
          render={({
            field: { value, onChange },
          }) => (
            <Select
              name="type"
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.input}
              InputLeftElement={(
                <Icon
                  as={<MaterialIcons name="credit-card" />}
                  size={5}
                  ml="2"
                  color="#3b82f6"
                />
             )}
            >
              <Select.Item label="Oszczędnościowa" value="Oszczędnościowa" />
              <Select.Item label="Prywatna" value="Prywatna" />
              <Select.Item label="Firmowa" value="Firmowa" />
              <Select.Item label="Inna" value="Inna" />
            </Select>
          )}
          name="type"
          defaultValue="Prywatna"
        />
      </View>
      <View style={styles.input_container}>
        <Controller
          control={control}
          name="balance"
          render={({
            field: { value, onChange, onBlur },
          }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              keyboardType="numeric"
              InputLeftElement={(
                <Icon
                  as={<MaterialIcons name="attach-money" />}
                  size={5}
                  ml="2"
                  color="#3b82f6"
                />
                )}
              placeholder="Initial Balance"
            />
          )}
        />
      </View>
      <View style={styles.input_container}>
        {(!componentState.loading && componentState.result)
          ? <Result error={componentState.error} errorMessage={componentState.errorMessage} message="Card Added Successfully" />
          : (
            <Button
              onPress={handleSubmit(handleSaveButton)}
              style={styles.button}
              isLoading={componentState.loading}
              isLoadingText="Saving..."
            >
              Save
            </Button>
          )}
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
