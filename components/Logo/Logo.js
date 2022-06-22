import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text fontSize="6xl" bold color="#3b82f6">HBA</Text>
      <Text>Home Budget App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    marginVertical: 4,
  },
});
