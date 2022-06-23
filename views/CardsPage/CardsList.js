import { View } from 'native-base';
import React, { useContext } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AddCard from './AddCard';

const { width } = Dimensions.get('window');

export default function CardsList() {
  const { cards, contextState, selectedCard } = useContext(CardsContext);
  if (contextState.isLoading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        snapToInterval={width - 80}
        snapToAlignment="center"
      >
        {cards.map((item) => (
          <Card
            balance={item.balance}
            cardNumber={item.cardNumber}
            type={item.type}
            name={item.name}
            deleteButton
            key={item.cardNumber}
            isActive={selectedCard === item.cardNumber}
          />
        ))}
        <AddCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200,
    justifyContent: 'center',
  },
});
