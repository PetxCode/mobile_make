import React, { useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SignInScreen from "./Developemnt/AuthDirection/SignedIn";
import Login_Screen from "./Developemnt/AuthDirection/SignedUp";
import Welcome from "./Developemnt/AuthDirection/Welcome";
import { AuthProvider } from "./Developemnt/AuthPath/AuthState";
import { NavigationContainer } from "@react-navigation/native";
import { WelcomeNavigation } from "./Developemnt/AuthDirection/WelcomeNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Developemnt/MainScreen/HomeScreen";
import TheApp from "./PlaceHolders/theApp";
import MainRouting from "./Developemnt/MainRouting";
import GainRoute from "./Developemnt/GainedRoute";
// import HomeRoute from "./Developemnt/MainScreen/HomeRoute";

const Stack = createStackNavigator();

const page1 = ({ navigation }) => (
  <View>
    <Text>THis is Page 1</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Register an Account")}
    >
      <Text>Click here</Text>
    </TouchableOpacity>
  </View>
);

const page3 = ({ navigation }) => (
  <View>
    <Text>THis is Page 3</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Register an Account")}
    >
      <Text>Click here</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.pop()}>
      <Text>Click back</Text>
    </TouchableOpacity>
  </View>
);

const page2 = ({ navigation }) => (
  <View>
    <Text>THis is Page 2</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Register an Account11")}
    >
      <Text>Click here</Text>
    </TouchableOpacity>
  </View>
);

const NewWork = () => (
  <Stack.Navigator>
    <Stack.Screen name="Sign in to your account" component={page1} />
    <Stack.Screen name="Register an Account11" component={page3} />
    <Stack.Screen name="Register an Account" component={page2} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <GainRoute />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

// <WelcomeNavigation />

// <SafeAreaView>
// <ScrollView>
//   <View>
//     <AuthProvider>
//       <NavigationContainer>
//         <NewWork />
//       </NavigationContainer>
//     </AuthProvider>
//   </View>
// </ScrollView>
// </SafeAreaView>
