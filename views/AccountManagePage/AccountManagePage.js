import {
  ScrollView, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import AccountManageForm from './AccountManageForm';

export default function AccountManagePage() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <AccountManageForm />
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
