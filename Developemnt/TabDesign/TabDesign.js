import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        <MaterialCommunityIcons name="home" color={"black"} size={40} />
      </View>
    </TouchableOpacity>
  );
};

export default TabDesign;
