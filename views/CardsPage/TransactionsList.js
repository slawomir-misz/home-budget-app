// eslint-disable-next-line no-unused-vars
import { ScrollView, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Transaction from './Transaction';

export default function TransactionsList() {
  return (
    <ScrollView
      style={{ flex: 1, width: '100%' }}
      horizontal={false}
    >
      <Text style={styles.day_info} bold color="gray.400">
        Today
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <Text style={styles.day_info} bold color="gray.400">
        Yesterday
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Transaction />
      </View>
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
});
