import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { app } from "../base";
import { Appbar, Button, List, TextInput } from "react-native-paper";
import DisplayScreen from "./component/DisplayScreen";
import firebase from "firebase";

const newData = app.firestore().collection("newData");
const mgs = [
  { id: 1, name: "peter" },
  { id: 2, name: "Bukky" },
  { id: 3, name: "Ola" },
];
export default function TheApp() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    await newData.orderBy("createAt", "desc").onSnapshot((snapshot) => {
      const item = [];
      snapshot.forEach((doc) => {
        item.push({ ...doc.data(), id: doc.id });
      });
      setData(item);
    });
  };

  const addData = async () => {
    await newData.doc().set({
      title: text,
      createAt: new Date().toString(),
      done: false,
    });
    setText("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Appbar
            style={{ width: "100%", backgroundColor: "pink", color: "white" }}
          >
            <Appbar.Content title={"Hello"} />
          </Appbar>
          <Text>Hello again</Text>
          <TextInput
            lable={"Text"}
            value={text}
            onChangeText={setText}
            style={{ width: "200px", height: "30px" }}
          />
          <Button
            onPress={() => {
              addData();
            }}
          >
            Submit
          </Button>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DisplayScreen item={item} {...item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
