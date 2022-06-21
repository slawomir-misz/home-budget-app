/* eslint-disable no-unused-vars */
import {
  Text, View, Input, Icon, Button, Select,
} from 'native-base';
import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../../components/Result/Result';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export default function AddTransactionForm() {
  const { transactions, setTransactions, selectedCard } = useContext(TransactionsContext);
  const axios = useAxiosInterceptors();
  const {
    control,
    handleSubmit,
  } = useForm();

  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
    result: false,
  });

  const handleSaveButton = (data) => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.post(`transaction/save/${selectedCard}`, {
      category: data.category,
      price: data.price,
      type: data.type,
    }).then(() => {
      const transactionsTmp = [...transactions];
      transactionsTmp.push({
        price: data.price,
        category: data.category,
        type: data.type,
        createdDate: '2022-06-21',
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
    <View style={styles.container}>
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
                  as={<MaterialIcons name="compare-arrows" />}
                  size={5}
                  ml="2"
                  color="#3b82f6"
                />
             )}
            >
              <Select.Item label="Outgoing" value="outgoing" />
              <Select.Item label="Incoming" value="incoming" />
            </Select>
          )}
          name="type"
          defaultValue="outgoing"
        />
      </View>
      <View style={styles.input_container}>
        <Controller
          control={control}
          render={({
            field: { value, onChange },
          }) => (
            <Select
              name="category"
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.input}
              InputLeftElement={(
                <Icon
                  as={<MaterialIcons name="add-shopping-cart" />}
                  size={5}
                  ml="2"
                  color="#3b82f6"
                />
             )}
            >
              <Select.Item label="Shopping" value="Shopping" />
              <Select.Item label="Bills" value="Bills" />
              <Select.Item label="Subscriptions" value="Subscriptions" />
              <Select.Item label="Transfer" value="Transfer" />
            </Select>
          )}
          name="category"
          defaultValue="Shopping"
        />
      </View>
      <View style={styles.input_container}>
        <Controller
          rules={{ required: 'Price is required' }}
          control={control}
          name="price"
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
                placeholder="Price"
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
          ? <Result error={componentState.error} errorMessage={componentState.errorMessage} message="Transaction Added Successfully" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  input_container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  input: {
    height: 50,
  },
  button: {
    margin: 0,
    backgroundColor: '#3b82f6',
  },
});
