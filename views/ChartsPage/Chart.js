/* eslint-disable react/no-unstable-nested-components */
import { Text } from 'native-base';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';

export default function Chart() {
  const data = [
    {
      value: 50,
      label: '01',
      topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 6 }}>50</Text>),
    },
    { value: 80, label: '02' },
    { value: 90, label: '03' },
    { value: 70, label: '04' },
    { value: 50, label: '05' },
    { value: 80, label: '06' },
    { value: 90, label: '07' },
    { value: 70, label: '08' },
    { value: 50, label: '09' },
    { value: 80, label: '10' },
    { value: 90, label: '11' },
    { value: 70, label: '12' },
    { value: 50, label: '13' },
    { value: 80, label: '14' },
    { value: 90, label: '15' },
    { value: 70, label: '16' }];

  return (
    <>
      <Text pt={4} fontSize="lg">Daily outgoings</Text>
      <BarChart
        data={data}
        frontColor="#3b82f6"
        barWidth={20}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
        noOfSections={3}
        barBorderRadius={4}
      />
    </>
  );
}
