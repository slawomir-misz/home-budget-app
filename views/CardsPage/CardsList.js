/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Text, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AddCard from './AddCard';

const SLIDER_WIDTH = Dimensions.get('window').width + 40;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function CardsList() {
  const { cards, contextState, selectedCard } = useContext(CardsContext);
  const isCarousel = React.useRef(null);

  function CarouselCardItem({ item }) {
    return (
      <Card
        balance={item.balance}
        cardNumber={item.cardNumber}
        type={item.type}
        name={item.name}
        deleteButton
        key={item.cardNumber}
        isActive={selectedCard === item.cardNumber}
      />
    );
  }

  if (contextState.isLoading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }
  if (!contextState.isLoading && cards.length < 1) {
    return (
      <View style={styles.container}>
        <Text fontSize="2xl">Looks like you dont have any cards...</Text>
        <Text fontSize="2xl">Fell free to add one!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={cards}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
