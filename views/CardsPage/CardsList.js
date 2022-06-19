import { View } from 'native-base';
import React, { useContext } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AddCard from './AddCard';

const { width } = Dimensions.get('window');

export default function CardsList() {
  const { cards, loading } = useContext(CardsContext);
  if (loading) {
    return (
      <View style={{ flex: 1, maxHeight: 200, justifyContent: 'center' }}>
        <LoadingSpinner />
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flex: 1, maxHeight: 200 }}
      pagingEnabled
      horizontal
      decelerationRate={0}
      snapToInterval={width - 80}
      snapToAlignment="center"
      contentInset={{
        top: 0,
        left: 30,
        bottom: 0,
        right: 30,
      }}
    >
      {cards.map((item) => (
        <Card
          balance={item.balance}
          cardNumber={item.cardNumber}
          type={item.type}
          name={item.name}
          key={item.cardNumber}
          deleteButton
        />
      ))}
      <AddCard />
    </ScrollView>
  );
}
