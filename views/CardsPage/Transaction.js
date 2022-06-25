/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Text, View, IconButton } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import TransactionCategoryIcon from '../../components/TransactionCategoryIcon/TransactionCategoryIcon';

export default function Transaction({
  price, type, category, date,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.transaction_details_container}>
        <IconButton
          style={styles.iconButton}
          p={4}
          icon={<TransactionCategoryIcon transactionCategory={category} />}
        />
        <View style={styles.transaction_details}>
          <Text bold fontSize="lg">{category}</Text>
          <Text color="gray.400">{date}</Text>
        </View>
      </View>
      <Text style={styles.transaction_price} bold color={type === 'outgoing' ? 'danger.400' : 'green.500'}>
        {type === 'outgoing' ? '- ' : ''}
        {`$ ${price}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transaction_details_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transaction_details: {
    marginLeft: 10,
  },
  iconButton: {
    backgroundColor: '#E4ECFD',
    borderRadius: 15,
  },
});
