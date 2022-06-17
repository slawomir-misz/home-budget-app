/* eslint-disable react/prop-types */
import { Text } from 'native-base';
import React from 'react';
import {
  StyleSheet, ImageBackground, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const backgroundImage = require('../../assets/card_background.jpg');

export default function Card({
  balance, cardNumber, type, name,
}) {
  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.view} imageStyle={{ borderRadius: 20 }}>
      <Text fontSize="2xl" style={styles.card_balance}>
        $
        {' '}
        {balance}
      </Text>
      <Text fontSize="xl" style={styles.card_number}>{`****  ****  ****  ${cardNumber}`}</Text>
      <Text fontSize="lg" style={styles.card_type}>{`${name} ${type}`}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    width: width - 100,
    margin: 10,
    height: 170,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  card_number: {
    textAlign: 'center',
    color: '#fff',
  },
  card_balance: {
    paddingLeft: 20,
    color: '#fff',
    fontWeight: '500',
  },
  card_type: {
    color: '#fff',
    textAlign: 'center',
  },
});
