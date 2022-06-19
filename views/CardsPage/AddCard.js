import { Pressable, Text } from 'native-base';
import React from 'react';
import {
  StyleSheet, ImageBackground, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const backgroundImage = require('../../assets/card_background_gray.jpg');

export default function AddCard() {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.add_card} onPress={() => navigation.navigate('AddCard')}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.view} imageStyle={{ borderRadius: 20 }}>
        <Text fontSize="2xl" style={styles.card_number}>****  ****  ****  ****</Text>
        <Text fontSize="xl" style={styles.card_type}>Add new card +</Text>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    width: width - 100,
    margin: 10,
    height: 170,
    borderRadius: 20,
    justifyContent: 'center',
    opacity: 0.8,
  },
  card_number: {
    textAlign: 'center',
    color: '#fff',
  },
  card_balance: {
    color: '#fff',
    fontWeight: '500',
  },
  card_type: {
    color: '#fff',
    textAlign: 'center',
  },
});
