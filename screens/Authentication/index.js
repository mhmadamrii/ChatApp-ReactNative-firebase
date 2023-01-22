import React, { Component, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";

// styles
import { _login } from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <View style={{ marginTop: Platform.OS === "android" ? 40 : 0 }}>
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
        <Button title="press to Login" onPress={handleLogin} disabled={loading} />
      </View>
    </>
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(Platform.OS);

  const handleSignUp = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("signup success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <>
      <View style={{ marginTop: Platform.OS === "android" ? 40 : 0 }}>
        <TextInput
          placeholder="enter email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ padding: 10, height: 100, fontSize: 30 }}
        />
        <TextInput
          placeholder="enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ padding: 10, height: 100, fontSize: 30 }}
        />
      </View>
      <Button title="press to sign up" onPress={handleSignUp} />
    </>
  );
};

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginPage: true,
      isRegisterPage: false,
    };
  }
  render() {
    return (
      <>
        {this.state.isLoginPage ? <Login /> : <Register />}
        <TouchableOpacity
          onPress={() =>
            this.setState({ isLoginPage: !this.state.isLoginPage })
          }
          style={{
            borderWidth: 1,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Text>toggle btn</Text>
        </TouchableOpacity>
      </>
    );
  }
}
