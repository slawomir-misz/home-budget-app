import {
  ScrollView, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddTransactionForm from './AddTransactionForm';

export default function AddTransactionPage() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <AddTransactionForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollview: {
    width: '100%',
  },
});
