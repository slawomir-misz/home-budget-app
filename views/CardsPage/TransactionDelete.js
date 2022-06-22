/* eslint-disable react/prop-types */
import {
  Icon, IconButton, Spinner,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { CardsContext } from '../../contexts/CardsContext';

export default function TransactionDelete({ transactionId }) {
  const axios = useAxiosInterceptors();
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const { getCards } = useContext(CardsContext);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
  });

  const handleButtonClick = () => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.delete(`/transaction/delete/${transactionId}`)
      .then(() => {
        getCards();
        const transactionsTmp = [...transactions];
        const filteredTransactions = transactionsTmp.filter(
          (transaction) => transaction.id !== transactionId,
        );
        setTransactions(filteredTransactions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (componentState.loading) {
    return (
      <IconButton
        onPress={handleButtonClick}
        style={styles.iconButton}
        p={4}
      >
        <Spinner size="sm" color="#f43f5e" />
      </IconButton>
    );
  }
  return (
    <IconButton
      onPress={handleButtonClick}
      style={styles.iconButton}
      p={4}
      icon={(
        <Icon
          as={MaterialCommunityIcons}
          name="delete"
          size={6}
          color="#f43f5e"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: '#fecdd3',
    borderRadius: 15,
  },
});
