/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  Button, Icon, IconButton, ScrollView, Text, View,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import Transaction from './Transaction';
import Result from '../../components/Result/Result';

export default function TransactionsList() {
  const {
    transactions, loading, isError, selectedCard,
  } = useContext(TransactionsContext);
  const navigation = useNavigation();

  const renderItem = (data) => (
    <View style={{ alignItems: 'center' }}>
      <Transaction
        category={data.item.category}
        date={data.item.createdDate}
        price={data.item.price}
        type={data.item.type}
      />
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => console.log(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isError) {
    <View style={{
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Result error errorMessage={isError} />
    </View>;
  }
  if (loading) {
    return (
      <View style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <LoadingSpinner />
      </View>
    );
  }
  if (transactions.length < 1 && selectedCard && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text fontSize="2xl" mb={3}>We did not find any transactions...</Text>
        <Button style={styles.button} onPress={() => navigation.navigate('AddTransaction')}>Add transaction</Button>
      </View>
    );
  }
  return (
    <>
      {selectedCard && transactions.length > 0
        ? (
          <View style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
          >
            <IconButton
              onPress={() => navigation.navigate('AddTransaction')}
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
        )
        : null }
      <View style={{ flex: 1, width: '100%' }}>
        <SwipeListView
          data={transactions}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-150}
          previewRowKey="0"
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  day_info: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  button: {
    height: 50,
    width: 200,
    margin: 10,
    backgroundColor: '#3b82f6',
  },
  iconButton: {
    backgroundColor: '#e3e4e6',
    borderRadius: 15,
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
