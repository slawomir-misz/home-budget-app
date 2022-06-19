/* eslint-disable react/prop-types */
import { Icon, IconButton } from 'native-base';
import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TransactionIcon({ transactionCategory }) {
  const getIcon = () => {
    switch (transactionCategory) {
      case 'Shopping':
        return 'squirrel';
      case 'Transfer':
        return 'squirrel';
      case 'Subsciptions':
        return 'squirrel';
      case 'Bills':
        return 'squirrel';
      default:
        return 'alert';
    }
  };

  return (
    <IconButton
      style={styles.iconButton}
      p={4}
      icon={(
        <Icon
          as={Octicons}
          name={getIcon(transactionCategory)}
          size={6}
          color="#548BF5"
        />
          )}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: '#E4ECFD',
    borderRadius: 15,
  },
});
