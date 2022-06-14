import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default function LoginLogo() {
  return (
    <View style={styles.container}>
      <Text fontSize="6xl" bold color="#3b82f6">HBA</Text>
      <Text>Home Budget App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
    marginVertical: 4,
  },
});
