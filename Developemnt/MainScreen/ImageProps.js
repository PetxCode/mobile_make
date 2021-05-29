import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageProps = ({ title, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={img}
        style={{
          backgroundColor: "red",
          width: 150,
          height: 100,
          borderRadius: 5,
          margin: 10,
        }}
      />
      <Text
        style={{
          color: "#651E32",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageProps;
