import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageProps from "./ImageProps";

const RecentlyBook = ({ title, img, onPress }) => {
  return (
    <View style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
      <Text
        style={{
          color: "#651E32",
          fontSize: 17,
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Recently Booked
      </Text>
      <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
        <ImageProps
          title="Backdrop studio"
          img={require("../../assets/peter.jpg")}
        />
        <ImageProps
          title="Sand studio"
          img={require("../../assets/ndidd.jpg")}
        />
        <ImageProps
          title="Sand studio"
          img={require("../../assets/peter.jpg")}
        />
        <ImageProps title="Camera" img={require("../../assets/3.jpg")} />

        <ImageProps
          title="Sand studio"
          img={require("../../assets/ndidd.jpg")}
        />
      </ScrollView>
    </View>
  );
};

export default RecentlyBook;
