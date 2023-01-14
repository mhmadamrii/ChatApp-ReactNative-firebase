import React, { Component, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

// styles
import { _login } from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  return (
    <>
      <View style={_login.container}>
        <View style={_login.inputGroup}>
          <TextInput
            style={_login.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={_login.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View>
          <TouchableOpacity style={_login.btnLogin} onPress={handleLogin}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Register = () => {
  return (
    <>
      <Text>Register page</Text>
    </>
  );
};

export default class Authentication extends Component {
  render() {
    return (
      <>
        <Login />
      </>
    );
  }
}
