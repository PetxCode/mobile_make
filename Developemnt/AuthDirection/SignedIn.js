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
import { app } from "../../base";
import { AuthContext } from "../AuthPath/AuthState";

const signedUser = app.firestore().collection("user24");

const SignInScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const LoginUser = async () => {
    const myUser = await app.auth().signInWithEmailAndPassword(email, password);

    navigation.navigate("Home");
    console.log(myUser.user.uid);
    console.log("Sign Up");
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
              LoginUser();
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
              Sign In
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
              Don't have an Account,
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: 5,
              }}
              onPress={() => {
                navigation.navigate("Register for an Account");
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
                Sign Up Here
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

          {currentUser ? (
            <MyButton
              title="SignOut"
              onPress={() => {
                app.auth().signOut();
              }}
            />
          ) : null}
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
              Sign In with Facebook
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
              Sign In with Google
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
export default SignInScreen;
