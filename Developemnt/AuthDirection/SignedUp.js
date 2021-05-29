import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingViewBase,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import firebase from "firebase";
import { AuthContext } from "../AuthPath/AuthState";
import { app } from "../../base";

// import auth from "@react-native-firebase/auth";

const signedUser = app.firestore().collection("user24");

const Login_Screen = ({ navigation }) => {
  
  const { currentUser, current, signUp, signIn } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const RegisterUser = async () => {
    const myUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // await app.auth().currentUser.updateProfile({
    //   displayName: name,
    // });

    await signedUser.doc(myUser.user.uid).set({
      email,
      password,
      name,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: myUser.user.uid,
      firstLetter: name.charAt(0).toUpperCase(),
      
    });
    navigation.navigate("Home");
    // console.log(myUser.user.uid);
    // console.log("Sign Up");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logo__container}>
          <Image
            source={require("../../assets/pick.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TextInput
          placeholder="User Name"
          autoCapitalize="none"
          autoCorrect={false}
          // icons="person"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          // icons="person"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          icons="lock"
          textContentType="password"
          secureTextEntry={true}
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#651E32",
              width: 300,
              height: 35,
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => {
              RegisterUser();
              console.log("Sign Up")
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "#651E32",
                fontSize: 10,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Already have an Account,
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: 5,
              }}
              onPress={() => {
                navigation.navigate("Register for an Account1");
                console.log("I'm Tapped to sign In");
              }}
            >
              <Text
                style={{
                  color: "#651E32",
                  fontSize: 10,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Sign in Here
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 20,
              textTransform: "uppercase",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {" "}
            Or Sign-in with Social Feeds
          </Text>

          {currentUser ? <Text>Sign Out</Text> : null}
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#41a8fc",
              width: 300,
              height: 35,
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 15,
            }}
            onPress={() => {
              navigation.navigate("HomeScreenRoute");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Sign up with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "tomato",
              width: 300,
              height: 35,
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("HomeScreenRoute");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Sign up with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#651E32",
              fontSize: 10,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          ></Text>

          <TouchableOpacity
            style={{
              marginLeft: 5,
            }}
            onPress={() => {
              navigation.pop();
              console.log("Sign Tapped1 Now");
            }}
          >
            <Text
              style={{
                color: "#651E32",
                fontSize: 10,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              GO back to Welcome Screen
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    width: 100,
    backgroundColor: "red",
  },
  textInput: {
    fontSize: 15,
    paddingLeft: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ebeced",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  logo: {
    width: 110,
    height: 70,
    marginBottom: 20,
    marginTop: 100,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  logo__container: {
    alignItems: "flex-start",
  },
});
export default Login_Screen;
