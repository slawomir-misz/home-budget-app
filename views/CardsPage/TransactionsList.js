/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  Button, ScrollView, Text, View,
} from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { CardsContext } from '../../contexts/CardsContext';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import Transaction from './Transaction';

export default function TransactionsList() {
  const {
    transactions, loading, error, selectedCard,
  } = useContext(TransactionsContext);
  const { cards } = useContext(CardsContext);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <LoadingSpinner />
      </View>
    );
  }
  if (transactions.length < 1 && selectedCard && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text fontSize="2xl" mb={3}>We did not find any transactions...</Text>
        <Button style={styles.button} onPress={() => navigation.navigate('AddTransaction')}>Add transaction</Button>
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flex: 1, width: '100%' }}
      horizontal={false}
    >
      {transactions.length > 0
      && (
      <Text style={styles.day_info} bold color="gray.400">
        Today
      </Text>
      )}
      {transactions.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <View style={{ alignItems: 'center' }} key={idx}>
          <Transaction
            category={item.category}
            date={item.createdDate}
            price={item.price}
            type={item.type}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  day_info: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  button: {
    height: 50,
    width: 200,
    margin: 10,
    backgroundColor: '#3b82f6',
  },
});
