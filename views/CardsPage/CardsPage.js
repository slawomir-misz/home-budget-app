import {
  ScrollView, Text, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function CardsPage() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>DashboardPage</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
