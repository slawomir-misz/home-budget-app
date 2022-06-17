import {
  StatusBar, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import CardsList from './CardsList';
import TransactionsList from './TransactionsList';

export default function CardsPage() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CardsList />
      <TransactionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
