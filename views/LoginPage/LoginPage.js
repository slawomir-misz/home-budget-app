import React from 'react';
import { Input, Icon, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Keyboard, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import LoginLogo from './LoginLogo';

export default function LoginPage() {
  const [show, setShow] = React.useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LoginLogo />
        <View style={styles.input_container}>
          <Input
            style={styles.input}
            InputLeftElement={(
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="#3b82f6"
              />
            )}
            placeholder="Username"
          />
        </View>
        <View style={styles.input_container}>
          <Input
            style={styles.input}
            type={show ? 'text' : 'password'}
            InputRightElement={(
              <Icon
                as={
                  <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
                }
                size={5}
                mr="2"
                color="#3b82f6"
                onPress={() => setShow(!show)}
              />
            )}
            placeholder="Password"
          />
        </View>
        <View style={styles.input_container}>
          <Button
            onPress={() => console.log('hello world')}
            style={styles.login_button}
          >
            Log in
          </Button>
        </View>
        <View style={styles.input_container}>
          <Button
            onPress={() => console.log('hello world')}
            style={styles.register_button}
            variant="outline"
            _text={{
              color: '#3b82f6',
            }}
          >
            Register
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    width: '80%',
    padding: 10,
  },
  input: {
    height: 50,
  },
  login_button: {
    margin: 0,
    backgroundColor: '#3b82f6',
  },
  register_button: {
    margin: 0,
    borderColor: '#3b82f6',
  },
});
