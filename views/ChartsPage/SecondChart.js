/* eslint-disable react/no-unstable-nested-components */
import { Icon, Text } from 'native-base';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export default function SecondChart() {
  const windowWidth = Dimensions.get('window').width;
  const data = [
    {
      value: 50,
      labelComponent: () => (
        <Icon
          as={<MaterialCommunityIcons name="store" />}
          size={5}
          ml="2"
        />
      ),
      topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 6 }}>50</Text>),
    },
    {
      value: 20,
      labelComponent: () => (
        <Icon
          as={<MaterialCommunityIcons name="store" />}
          size={5}
          ml="2"
        />
      ),
      topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 6 }}>110</Text>),
    }, {
      value: 110,
      labelComponent: () => (
        <Icon
          as={<MaterialCommunityIcons name="store" />}
          size={5}
          ml="2"
        />
      ),
      topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 6 }}>10</Text>),
    }, {
      value: 10,
      labelComponent: () => (
        <Icon
          as={<MaterialCommunityIcons name="store" />}
          size={5}
          ml="2"
        />
      ),
      topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 6 }}>10</Text>),
    }];

  return (
    <>
      <Text pt={4} fontSize="lg">Monthly categories outgoing</Text>
      <BarChart
        data={data}
        frontColor="#3b82f6"
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
        noOfSections={3}
        barBorderRadius={4}
        width={windowWidth - 20}
      />
    </>
  );
}
