import React, { Component, createContext, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

// screens
import Chat from "./screens/Chat";
import Test from "./screens/Test";
import Authentication from "./screens/Authentication";

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

class ChatStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="auth" component={Authentication} />
        {/* <Stack.Screen name="chat" component={Chat} /> */}
      </Stack.Navigator>
    );
  }
}

class RootNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <ChatStack />
      </NavigationContainer>
    );
  }
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
