import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
// import {  } from "react-native-gesture-handler";

const TabDesign = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          borderColor: "white",
          borderWidth: 10,
          bottom: 25,
          backgroundColor: "#651E32",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <MaterialCommunityIcons name="home" color={"white"} size={40} /> */}
        <Image
          source={require("../../assets/logo11.png")}
          resizeMode="cover"
          style={{
            width:60,
            height:60,
            borderRadius:30
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TabDesign;
