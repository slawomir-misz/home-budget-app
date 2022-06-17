import {
  Icon, IconButton, Text, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

export default function Transaction() {
  return (
    <View style={styles.container}>
      <View style={styles.transaction_details_container}>
        <IconButton
          style={styles.iconButton}
          p={4}
          icon={(
            <Icon
              as={Octicons}
              name="squirrel"
              size={7}
              color="#548BF5"
            />
                )}
        />
        <View style={styles.transaction_details}>
          <Text bold fontSize="lg">Starbucks</Text>
          <Text color="gray.400">12.06.2022</Text>
        </View>
      </View>
      <Text style={styles.transaction_price} bold color="danger.400">-$15.90</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#E4ECFD',
    borderRadius: 15,
  },
  transaction_details_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transaction_details: {
    marginLeft: 10,
  },
});
