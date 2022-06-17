import React from 'react';
import { StatusBar } from 'native-base';
import {
  Keyboard, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import AddCardForm from './AddCardForm';

export default function AddCardPage() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.form_container}>
          <AddCardForm />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  form_container: {
    width: '80%',
  },
});
