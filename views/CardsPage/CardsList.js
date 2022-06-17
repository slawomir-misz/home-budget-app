import { Icon, Pressable, Text } from 'native-base';
import React, { useContext } from 'react';
import {
  StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card/Card';
import { CardsContext } from '../../contexts/CardsContext';

const { width } = Dimensions.get('window');

export default function CardsList() {
  const navigation = useNavigation();
  const { cards } = useContext(CardsContext);
  return (
    <>
      <Pressable style={styles.add_card} onPress={() => navigation.navigate('AddCard')}>
        <Text fontSize="xl">Add new card</Text>
        <Icon
          as={MaterialCommunityIcons}
          name="credit-card-plus-outline"
          size={6}
          ml={2}
          color="#3b82f6"
        />
      </Pressable>
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  add_card: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
