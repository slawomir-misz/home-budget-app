/* eslint-disable react/prop-types */
import React from 'react';
import {
  CheckIcon, Text, CloseIcon,
} from 'native-base';
import { StyleSheet, View } from 'react-native';

export default function Result({ error, errorMessage, message }) {
  if (error) {
    return (
      <View style={styles.result_container}>
        <CloseIcon size="5" mt="0.5" color="danger.500" />
        <Text color="danger.500" fontSize="md">
          {errorMessage || 'Some error occured, try again'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.result_container}>
      <CheckIcon size="5" mt="0.5" color="emerald.500" />
      <Text color="emerald.500" fontSize="md">
        {message}
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