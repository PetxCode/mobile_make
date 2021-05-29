import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";

import DetailScreen from "./DetailScreen";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();
const HomeRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detailed" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeRoute;
