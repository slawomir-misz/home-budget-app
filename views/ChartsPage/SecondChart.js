/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import { Icon, Text, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import { CardsContext } from '../../contexts/CardsContext';
import TransactionCategoryIcon from '../../components/TransactionCategoryIcon/TransactionCategoryIcon';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export default function SecondChart() {
  const axios = useAxiosInterceptors();
  const { selectedCard } = useContext(CardsContext);
  const { transactions } = useContext(TransactionsContext);
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
  const [chartData, setChartData] = useState([]);

  const prepareChartData = (x) => {
    const tmpChartData = [];
    x.forEach((element) => {
      tmpChartData.push({
        value: element.sumTransaction,
        labelComponent: () => (
          <View ml={2}>
            <TransactionCategoryIcon transactionCategory={element.category} />
          </View>
        ),
        topLabelComponent: () => (<Text style={{ color: 'blue', marginBottom: 10 }}>{element.sumTransaction}</Text>),
      });
    });
    setChartData(tmpChartData);
  };

  useEffect(() => {
    axios.get(`/transaction/getSum/${selectedCard}?date=06`).then((response) => {
      prepareChartData(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [selectedCard, transactions]);

  return (
    <>
      <Text pt={4} fontSize="lg">Monthly categories outgoing</Text>
      <BarChart
        data={chartData}
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
