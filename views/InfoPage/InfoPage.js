import {
  Icon,
  Text, View,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InfoPage() {
  return (
    <View style={styles.container}>
      <Text fontSize="4xl" mb={3}>Application created in</Text>
      <View style={styles.icon_text_container}>
        <Icon
          as={MaterialCommunityIcons}
          name="react"
          size={12}
          ml={2}
          color="#3b82f6"
        />
        <Text fontSize="2xl">React Native</Text>
      </View>
      <View style={styles.icon_text_container}>
        <Icon
          as={MaterialCommunityIcons}
          name="language-java"
          size={12}
          ml={2}
          color="#22c55e"
        />
        <Text fontSize="2xl">Spring Boot</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_text_container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    margin: 10,
  },
});
