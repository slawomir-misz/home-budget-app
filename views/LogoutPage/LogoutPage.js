import {
  Button, Icon, Text, View,
} from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

export default function LogoutPage() {
  const navigation = useNavigation();
  const { setTokens } = useContext(AuthContext);
  const handleLogoutClick = () => {
    setTokens({
      access_token: '',
      refresh_token: '',
    });
  };
  return (
    <View style={styles.view}>
      <Icon
        as={Octicons}
        name="sign-out"
        size={20}
        mb={3}
        color="#3b82f6"
      />
      <Text fontSize="2xl">Oh no! You are leaving..</Text>
      <Text fontSize="2xl" mb={3}>Are you sure?</Text>
      <Button
        onPress={() => navigation.navigate('Cards')}
        style={styles.button}
      >
        Naaah, just kidding
      </Button>
      <Button
        onPress={handleLogoutClick}
        style={styles.button_border_only}
        _text={{
          color: '#3b82f6',
        }}
        variant="outline"
      >
        Log me out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 200,
    margin: 10,
    backgroundColor: '#3b82f6',
  },
  button_border_only: {
    margin: 10,
    borderColor: '#3b82f6',
    height: 50,
    width: 200,
  },
});
