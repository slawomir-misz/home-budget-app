/* eslint-disable react/prop-types */
import React from 'react';
import {
  CheckIcon, Text, CloseIcon,
} from 'native-base';
import { StyleSheet, View } from 'react-native';

export default function Result({ errorMessage, message }) {
  if (errorMessage) {
    return (
      <View style={styles.container}>
        <CloseIcon size="3" mt="0.5" color="danger.500" />
        <Text color="danger.500" fontSize="md" pl={1}>
          {errorMessage}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CheckIcon size="5" mt="0.5" color="emerald.500" />
      <Text color="emerald.500" fontSize="md" pl={1}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
