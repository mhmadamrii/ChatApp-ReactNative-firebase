import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
  console.log(GiftedChat);
  return (
    <>
      <View style={{ flex: 1 }}>
        <GiftedChat />
      </View>
    </>
  );
}
