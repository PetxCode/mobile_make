import React, { useContext } from "react";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./MainScreen/HomeScreen";
import HomeRoute from "./MainScreen/HomeRoute";
import Post from "./Posting/Post";
import MainRouting from "./MainRouting";
import Welcome from "./AuthDirection/Welcome";
import { AuthContext } from "./AuthPath/AuthState";
import { WelcomeNavigation } from "./AuthDirection/WelcomeNavigation";

const Stack = createStackNavigator();
const GainRoute = () => {
  const { current } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {current ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainScreenNav"
          component={MainRouting}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Reg"
          component={WelcomeNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default GainRoute;
