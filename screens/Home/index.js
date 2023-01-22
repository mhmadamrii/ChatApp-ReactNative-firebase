import React, { useState } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth"

export default function Home() {
  const navigation = useNavigation();

  const logOutButton = async () => {
    // try {
    //   await firebase.auth().signOut()
    //   navigation.navigate('auth')
    // } catch (error) {
    //   console.log(error);
    // }
    signOut().then(() => console.log("signed out success"))
  }

  return (
    <>
      <View>
        <Text>Home</Text>
        <Button onPress={() => navigation.navigate("chat")} title="chat" />
      </View>
    </>
  );
}
