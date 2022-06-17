/* eslint-disable react/prop-types */
import {
  Icon, Pressable, Text, View,
} from 'native-base';
import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet, ImageBackground, Dimensions,
} from 'react-native';
import DeleteCardModal from './DeleteCardModal';

const { width } = Dimensions.get('window');
const backgroundImage = require('../../assets/card_background.jpg');

export default function Card({
  balance, cardNumber, type, name, deleteButton,
}) {
  const [deleteCardModalVisible, setDeleteCardModalVisible] = useState(false);
  return (
    <>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.view} imageStyle={{ borderRadius: 20 }}>
        <View style={styles.card_header}>
          <Text fontSize="2xl" style={styles.card_balance}>
            $
            {' '}
            {balance}
          </Text>
          {deleteButton
          && (
          <Pressable onPress={() => setDeleteCardModalVisible(true)}>
            <Icon
              as={Octicons}
              name="x"
              size={6}
              color="#fff"
            />
          </Pressable>
          )}
        </View>
        <Text fontSize="2xl" style={styles.card_number}>{`****  ****  ****  ${cardNumber}`}</Text>
        <Text fontSize="xl" style={styles.card_type}>{`${name} ${type}`}</Text>
      </ImageBackground>
      {deleteCardModalVisible
      && (
      <DeleteCardModal
        deleteCardModalVisible={deleteCardModalVisible}
        setDeleteCardModalVisible={setDeleteCardModalVisible}
        cardNumber={cardNumber}
      />
      ) }
    </>
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
  card_header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
