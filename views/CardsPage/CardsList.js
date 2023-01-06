/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import { Button, Text, View } from 'native-base';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import global from '../../styles/global';

const SLIDER_WIDTH = Dimensions.get('window').width + 40;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function CardsList() {
  const { cards, contextState, selectedCard } = useContext(CardsContext);
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();

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
      <View style={global.default_wrapper}>
        <View style={global.default_container}>
          <Text fontSize="2xl">Looks like you dont have any cards...</Text>
          <Text fontSize="2xl">Fell free to add one!</Text>
          <Button style={global.default_button} mt={2} onPress={() => navigation.navigate('AddCard')}>Add Card</Button>
        </View>
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
