/* eslint-disable react/prop-types */
import { Icon } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionCategoryIcon({ transactionCategory }) {
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
    <Icon
      as={MaterialCommunityIcons}
      name={getIcon(transactionCategory)}
      size={6}
      color="#548BF5"
    />
  );
}
