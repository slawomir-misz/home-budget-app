/* eslint-disable no-unused-vars */
import { View, Button } from 'native-base';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import global from '../../styles/global';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomInput from '../../components/CustomInput/CustomInput';

export default function AddTransactionForm() {
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const axios = useAxiosInterceptors();
  const route = useRoute();
  const {
    control,
    handleSubmit,
  } = useForm();
  const inputValuesType = [
    {
      label: 'Outgoing',
      value: 'outgoing',
    },
    {
      label: 'Incoming',
      value: 'incoming',
    },
  ];

  const inputValuesCategory = [
    {
      label: 'Shopping',
      value: 'Shopping',
    },
    {
      label: 'Bills',
      value: 'Bills',
    },
    {
      label: 'Subscriptions',
      value: 'Subscriptions',
    },
    {
      label: 'Transfer',
      value: 'Transfer',
    },
  ];

  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handleSaveButton = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post(`transaction/save/${route.params.activeCard}`, {
      category: data.category,
      price: data.price,
      type: data.type,
    }).then(() => {
      const transactionsTmp = [...transactions];
      transactionsTmp.push({
        price: data.price,
        category: data.category,
        type: data.type,
        createdDate: '2022-06-22',
      });
      setTransactions(transactionsTmp);
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
    <>
      <View style={global.default_container}>
        <CustomSelect
          control={control}
          name="type"
          iconName="swap-horizontal"
          defaultValue="outgoing"
          inputValues={inputValuesType}
        />
      </View>
      <View style={global.default_container}>
        <CustomSelect
          control={control}
          name="category"
          iconName="cart-plus"
          defaultValue="shopping"
          inputValues={inputValuesCategory}
        />
      </View>
      <View style={global.default_container}>
        <CustomInput
          control={control}
          name="price"
          placeholder="Price"
          iconName="currency-usd"
          keyboardType="numeric"
          rules={{ required: 'Price is required' }}
          type="text"
        />
      </View>
      <View style={global.default_container}>
        {(!componentState.loading && componentState.result)
          ? <Result error={componentState.error} errorMessage={componentState.errorMessage} message="Transaction Added Successfully" />
          : (
            <Button
              onPress={handleSubmit(handleSaveButton)}
              style={global.default_button}
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
