import React from "react";
import { Text } from "react-native";
import { View, Button } from "react-native";

const Feed = ({ navigation }) => {
  return (
    <View>
      <Text>The Feed Page</Text>
      <Button
        title="Press"
        style={{
          width: "100px",
        }}
        onPress={() => {
          navigation.navigate("Route");
        }}
      />
    </View>
  );
};

export default Feed;
