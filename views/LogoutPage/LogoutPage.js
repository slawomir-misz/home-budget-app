import {
  Button, Icon, Text, View,
} from 'native-base';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import global from '../../styles/global';

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
    <View style={global.default_wrapper}>
      <Icon
        as={Octicons}
        name="sign-out"
        size={16}
        mb={3}
        color="#3b82f6"
      />
      <Text fontSize="2xl">Oh no! You are leaving..</Text>
      <Text fontSize="2xl" mb={3}>Are you sure?</Text>
      <View style={global.default_container}>
        <Button
          onPress={() => navigation.navigate('Cards')}
          style={global.default_button}
        >
          Naaah, just kidding
        </Button>
      </View>
      <View style={global.default_container}>
        <Button
          onPress={handleLogoutClick}
          style={global.outline_button}
          _text={{
            color: '#3b82f6',
          }}
          variant="outline"
        >
          Log me out
        </Button>
      </View>
    </View>
  );
}
