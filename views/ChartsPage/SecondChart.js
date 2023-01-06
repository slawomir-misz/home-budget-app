/* eslint-disable react/no-unstable-nested-components */
import { Text, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
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
    axios.get(`/transaction/month-sum-by-category/${selectedCard}?date=01`).then((response) => {
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
