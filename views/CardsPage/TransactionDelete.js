import {
  Icon, IconButton,
} from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TransactionDelete() {
  return (
    <IconButton
      onPress={() => console.log('hehe')}
      style={styles.iconButton}
      p={4}
      icon={(
        <Icon
          as={MaterialCommunityIcons}
          name="delete"
          size={6}
          color="#f43f5e"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: '#fecdd3',
    borderRadius: 15,
  },
});
