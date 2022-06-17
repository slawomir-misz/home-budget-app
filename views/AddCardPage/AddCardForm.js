/* eslint-disable no-unused-vars */
import {
  Button, Icon, Input, Text, View, Select,
} from 'native-base';
import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import { CardsContext } from '../../contexts/CardsContext';

export default function AddCardForm() {
  const CARDNAME_REGEX = /^[a-zA-Z0-9_.-]*$/;
  const { cards, setCards } = useContext(CardsContext);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    errorMessage: '',
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
      cardNumber: data.cardNumber,
      name: data.name,
      type: data.type,
      balance: data.balance,
    }).then((response) => {
      // push new card to context
      const cardsTmp = [...cards];
      cardsTmp.push(data);
      setCards(cardsTmp);
      // set card component by new values
      setCardDetails({
        cardNumber: data.cardNumber,
        name: data.name,
        type: data.type,
        balance: data.balance,
      });
      // change component state
      setComponentState((prevState) => ({
        ...prevState, loading: false, result: true,
      }));
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
        deleteButton={false}
      />
      <View style={styles.input_container}>
        <Controller
          rules={{
            required: 'Card name is required',
            minLength: {
              value: 5,
              message: 'Card name should have at least 5 characters long',
            },
            maxLength: {
              value: 15,
              message: 'Card name should be max 15 charcters long',
            },
            pattern: { value: CARDNAME_REGEX, message: 'Card name is invalid' },
          }}
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
          rules={{
            required: 'Last card numbers is required',
            minLength: {
              value: 4,
              message: '4 numbers required',
            },
            maxLength: {
              value: 4,
              message: '4 numbers required',
            },
          }}
          control={control}
          name="cardNumber"
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
              <Select.Item label="Saving" value="Saving" />
              <Select.Item label="Private" value="Private" />
              <Select.Item label="Company" value="Company" />
              <Select.Item label="Other" value="Other" />
            </Select>
          )}
          name="type"
          defaultValue="Private"
        />
      </View>
      <View style={styles.input_container}>
        <Controller
          rules={{ required: 'Initial balance is required' }}
          control={control}
          name="balance"
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
                    as={<MaterialIcons name="attach-money" />}
                    size={5}
                    ml="2"
                    color="#3b82f6"
                  />
                )}
                placeholder="Initial Balance"
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
