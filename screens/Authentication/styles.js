import { StyleSheet } from "react-native";

export const _login = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    height: 200,
    justifyContent: "center",
  },
  input: {
    padding: 10,
    height: 100,
    fontSize: 30,
  },
  btnLogin: {
    borderWidth: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const _register = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default _login;
