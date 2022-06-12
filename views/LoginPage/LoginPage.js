import React from "react";
import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import LoginLogo from "./LoginLogo";

export default function LoginPage() {
  const [show, setShow] = React.useState(false);
  return (
    <View style={styles.container}>
      <LoginLogo />
      <View style={styles.input_container}>
        <Input style={styles.input}
            InputLeftElement={
            <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
            />
            }
            placeholder="Usernameh"
        />
      </View>
      <View style={styles.input_container}>
        <Input
            style={styles.input}
            type={show ? "text" : "password"}
            InputRightElement={
            <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
            />
            }
            placeholder="Password"
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input_container:{
    width: "80%",
    padding: 10
  },
  input: {
      height: 40,
  }
});
