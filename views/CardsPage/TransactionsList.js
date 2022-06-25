/* eslint-disable react/prop-types */
import {
  Button, Icon, IconButton, Text, View,
} from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import Transaction from './Transaction';
import global from '../../styles/global';
import TransactionDelete from './TransactionDelete';
import { CardsContext } from '../../contexts/CardsContext';

export default function TransactionsList() {
  const { transactions, contextState } = useContext(TransactionsContext);
  const { selectedCard } = useContext(CardsContext);
  const navigation = useNavigation();
  const renderItem = (data) => (
    <Transaction
      category={data.item.category}
      date={data.item.createdDate}
      price={data.item.price}
      type={data.item.type}
      id={data.item.id}
    />
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TransactionDelete transactionId={data.item.id} />
    </View>
  );

  if (contextState.isLoading) {
    return (
      <View style={global.default_wrapper}>
        <LoadingSpinner />
      </View>
    );
  }
  if (transactions.length < 1 && selectedCard > 0) {
    return (
      <View style={global.default_wrapper}>
        <View style={global.default_container}>
          <Text fontSize="xl" mb={3}>We did not find any transactions...</Text>
          <Button
            style={global.default_button}
            onPress={() => navigation.navigate(
              'AddTransaction',
              {
                selectedCard,
              },
            )}
          >
            Add transaction

          </Button>
        </View>
      </View>
    );
  }
  return (
    <>
      {selectedCard && transactions.length > 0 ? (
        <View style={styles.add_icon_container}>
          <IconButton
            onPress={() => navigation.navigate(
              'AddTransaction',
              {
                selectedCard,
              },
            )}
            style={styles.iconButton}
            p={4}
            icon={(
              <Icon
                as={MaterialCommunityIcons}
                name="plus-thick"
                size={6}
                color="#acacad"
              />
            )}
          />
        </View>
      ) : null}
      <View style={styles.list_container}>
        <SwipeListView
          data={transactions}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-90}
          previewRowKey="0"
          previewOpenValue={-40}
          previewOpenDelay={3000}
          closeOnScroll
          onTouchEnd={() => console.log('list ended')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  add_icon_container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  list_container: {
    width: '100%',
    flex: 1,
  },
  iconButton: {
    backgroundColor: '#e3e4e6',
    borderRadius: 15,
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
