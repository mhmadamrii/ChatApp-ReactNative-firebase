import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Text, View, TouchableOpacity } from "react-native";
import { auth, database } from "../../config/firebase";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  console.log(GiftedChat);

  const handleQuit = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={handleQuit}
        >
          <Text>Quittttt</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe()
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <GiftedChat 
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      </View>
    </>
  );
}
