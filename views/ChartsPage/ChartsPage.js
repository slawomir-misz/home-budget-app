import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Chart from './Chart';
import SecondChart from './SecondChart';

export default function ChartsPage() {
  return (
    <>
      <View style={styles.wrapper}>
        <Chart />
      </View>
      <View style={styles.wrapper}>
        <SecondChart />
      </View>
    </>
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
