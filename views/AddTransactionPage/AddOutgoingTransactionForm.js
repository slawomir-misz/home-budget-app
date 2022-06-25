import { View, Button } from 'native-base';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import global from '../../styles/global';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomInput from '../../components/CustomInput/CustomInput';
import { CardsContext } from '../../contexts/CardsContext';

export default function AddOutgoingTransactionForm() {
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const { getCards } = useContext(CardsContext);
  const axios = useAxiosInterceptors();
  const route = useRoute();
  const {
    control,
    handleSubmit,
  } = useForm();

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
    {
      label: 'Car',
      value: 'Car',
    },
  ];

  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handleSaveButton = (data) => {
    const dataForm = {
      ...data, type: 'outgoing',
    };
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post(`transaction/save/${route.params.selectedCard}`, dataForm).then((response) => {
      getCards();
      const transactionsTmp = [...transactions];
      transactionsTmp.push(response.data);
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
    <View style={styles.wrapper}>
      <View style={global.default_container}>
        <CustomSelect
          control={control}
          name="category"
          iconName="cart-plus"
          defaultValue="Shopping"
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
