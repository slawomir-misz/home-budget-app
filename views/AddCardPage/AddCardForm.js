/* eslint-disable no-unused-vars */
import {
  Button, Icon, View, Select,
} from 'native-base';
import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import { CardsContext } from '../../contexts/CardsContext';
import global from '../../styles/global';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

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
  const inputValues = [
    {
      label: 'Saving',
      value: 'Saving',
    },
    {
      label: 'Private',
      value: 'Private',
    },
    {
      label: 'Company',
      value: 'Company',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  const handleSaveButton = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post('/card/save', data).then((response) => {
      // push new card to context
      const cardsTmp = [...cards];
      cardsTmp.push(data);
      setCards(cardsTmp);
      // set card component by new values
      setCardDetails(data);
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
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="name"
          placeholder="Card Name"
          iconName="text"
          keyboardType="default"
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
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="cardNumber"
          placeholder="Last 4 number of card"
          iconName="numeric"
          keyboardType="numeric"
          rules={{
            required: 'Last card 4 numbers is required',
            minLength: {
              value: 4,
              message: '4 numbers required',
            },
            maxLength: {
              value: 4,
              message: '4 numbers required',
            },
          }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        <CustomSelect
          control={control}
          name="type"
          iconName="credit-card-outline"
          defaultValue="Private"
          inputValues={inputValues}
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="balance"
          placeholder="Initial card balance"
          iconName="currency-usd"
          keyboardType="numeric"
          rules={{ required: 'Initial card balance is required' }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        {(!componentState.loading && componentState.result)
          ? <Result error={componentState.error} errorMessage={componentState.errorMessage} message="Card Added Successfully" />
          : (
            <Button
              onPress={handleSubmit(handleSaveButton)}
              style={global.default_button}
              isLoading={componentState.loading}
              isLoadingText="Adding..."
            >
              Add Card
            </Button>
          )}
      </View>
    </>
  );
}
