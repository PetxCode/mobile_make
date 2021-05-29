import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import Profile from "./Profile";
import EditProfilePage from "./EditProfilePage";

const Stack = createStackNavigator();
const HandleProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profilePage"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
    </Stack.Navigator>
  );
};

export default HandleProfile;
