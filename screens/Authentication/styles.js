import { StyleSheet } from "react-native";

export const _login = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    borderColor: "red",
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: 'red',
    height: 200,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
    padding: 5,
    height: 40,
    fontSize: 20
  },
  btnLogin: {
    borderWidth: 1,
    height: 100
  }
});

export const _register = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default _login;
