import React from 'react';
import {
  Text, CloseIcon,
} from 'native-base';
import { StyleSheet, View } from 'react-native';

export default function LoginError() {
  return (
    <View style={styles.result_container}>
      <CloseIcon size="5" mt="0.5" color="danger.500" />
      <Text color="danger.500" fontSize="md">
        Wrong username or password
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  result_container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
});
