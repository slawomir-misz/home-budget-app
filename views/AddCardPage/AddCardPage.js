import React from 'react';
import {
  Keyboard, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import AddCardForm from './AddCardForm';

export default function AddCardPage() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <AddCardForm />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
