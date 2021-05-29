import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignedIn";
import Login_Screen from "./SignedUp";
import Welcome from "./Welcome";
import MainRouting from "../MainRouting";

const Stack = createStackNavigator();

export const WelcomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register for an Account"
        component={Login_Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register for an Account1"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main Screen"
        component={MainRouting}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
