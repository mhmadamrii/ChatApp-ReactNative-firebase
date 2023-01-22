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
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Test from "./screens/Test";
import Authentication from "./screens/Authentication";
import { ActivityIndicator, Text } from "react-native";

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
      <Stack.Navigator defaultScreenOptions={Home}>
        <Stack.Screen name="home" component={Home} />
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
    return () => unsubscribeAuth()
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
