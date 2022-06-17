import { Icon, Pressable } from 'native-base';
import React, { useContext } from 'react';
import {
  StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';

const { width } = Dimensions.get('window');

export default function CardsList() {
  const navigation = useNavigation();
  const { cards } = useContext(CardsContext);
  return (
    <ScrollView
      style={{ flex: 1, maxHeight: 200 }}
      pagingEnabled
      horizontal
      decelerationRate={0}
      snapToInterval={width - 60}
      snapToAlignment="center"
      contentInset={{
        top: 0,
        left: 30,
        bottom: 0,
        right: 30,
      }}
    >
      <Pressable style={styles.add_card} onPress={() => navigation.navigate('AddCard')}>
        <Icon
          as={Octicons}
          name="plus-circle"
          size={8}
          color="#3b82f6"
        />
      </Pressable>
      {cards.map((item) => (
        <Card
          balance={item.balance}
          cardNumber={item.cardNumber}
          type={item.type}
          name={item.name}
          key={item.cardNumber}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  add_card: {
    marginLeft: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
