import { View } from 'native-base';
import React from 'react';
import CardsList from './CardsList';
import TransactionsList from './TransactionsList';
import global from '../../styles/global';

export default function CardsPage() {
  return (
    <View style={global.default_wrapper}>
      <CardsList />
      <TransactionsList />
    </View>
  );
}
