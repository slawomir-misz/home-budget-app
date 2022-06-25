/* eslint-disable react/prop-types */
import { Icon, IconButton } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TransactionIcon({ transactionCategory }) {
  const getIcon = () => {
    switch (transactionCategory) {
      case 'Shopping':
        return 'store';
      case 'Transfer':
        return 'swap-horizontal';
      case 'Subscriptions':
        return 'netflix';
      case 'Bills':
        return 'home-lightning-bolt-outline';
      case 'Car':
        return 'car';
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
          as={MaterialCommunityIcons}
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
