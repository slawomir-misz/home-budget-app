import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddTransactionForm from './AddTransactionForm';

export default function AddTransactionPage() {
  return (
    <View style={styles.wrapper}>
      <AddTransactionForm />
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
