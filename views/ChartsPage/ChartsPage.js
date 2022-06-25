import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import SecondChart from './SecondChart';

export default function ChartsPage() {
  /*      <View style={styles.wrapper}>
        <Chart />
      </View> */
  return (
    <View style={styles.wrapper}>
      <SecondChart />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    width: '100%',
  },
});
