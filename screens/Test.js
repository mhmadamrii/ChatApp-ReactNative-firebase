import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";

const data = [
  {
    id: 1,
    title:
      "Anim labore sint adipisicing deserunt ut ipsum ullamco incididunt. Culpa incididunt non labore velit excepteur dolore incididunt sit exercitation ut qui excepteur. Nulla quis ex sint enim amet minim labore proident sunt.",
  },
  {
    id: 2,
    title:
      "Non incididunt consectetur deserunt sint ut. Ipsum pariatur excepteur sunt ex eiusmod exercitation Lorem reprehenderit sit. Anim voluptate amet quis eiusmod reprehenderit aliquip consequat Lorem aliqua Lorem aute culpa cupidatat. Eiusmod occaecat enim elit eiusmod. Id dolore aliquip minim non. Laboris tempor consectetur veniam elit excepteur. Velit laboris qui esse anim non do dolore magna exercitation exercitation consequat exercitation ut dolor.",
  },
];

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => (
    <View key={item.key} style={{ borderWidth: 1, borderColor: "red" }}>
      <Text>{item.title}</Text>
    </View>
  );

  render() {
    return (
      <>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <ActivityIndicator size="large" />
            <Pressable style={{ borderWidth: 1, borderColor: "red" }}>
              <Text style={{ fontSize: 50 }}>Hellow</Text>
              <Text>Hellow</Text>
              <Text>Hellow</Text>
              <Text>Hellow</Text>
            </Pressable>
          </View>
        </ScrollView>
      </>
    );
  }
}
