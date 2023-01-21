import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// firebase authenticated method
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

// screens
import Chat from "./screens/Chat";
import Test from "./screens/Test";
import Authentication from "./screens/Authentication";
import { async } from "@firebase/util";
import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native-web";

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState("pedro");

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

class ChatStack extends Component {
  render() {
    return (
      <Stack.Navigator defaultScreenOptions={Authentication}>
        {/* <Stack.Screen name="auth" component={Test} /> */}
        <Stack.Screen name="auth" component={Authentication} />
        <Stack.Screen name="chat" component={Chat} />
      </Stack.Navigator>
    );
  }
}

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
  }, [user]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <Authentication />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
