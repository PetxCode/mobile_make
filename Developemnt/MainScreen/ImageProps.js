import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageProps = ({ title, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}
    style={{
      
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      // borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 0,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,      
    }}
    >
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
          margin:10
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageProps;
