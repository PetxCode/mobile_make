import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, List } from "react-native-paper";
import { app } from "../../base";
import moment from "moment";

const newData = app.firestore().collection("newData");

const DisplayScreen = ({ item, id }) => {
  const [chng, setChng] = useState(true);

  const deleteData = async () => {
    await newData.doc(id).delete();
  };

  const chngDone = async () => {
    await newData.doc(id).update({
      done: chng,
    });
  };

  return (
    <View style={styles.container}>
      {item.done ? (
        <Button
          onPress={() => {
            setChng(!chng);
            chngDone(item.id);
            console.log(item.id);
          }}
        >
          Done
        </Button>
      ) : (
        <Button
          onPress={() => {
            setChng(!chng);
            chngDone(item.id);
            console.log(item.id);
          }}
        >
          Undone
        </Button>
      )}
      <View>
        <Text>{item.title}</Text>
        <Text>Current Date: {moment(item.createAt).fromNow()} </Text>
      </View>
      <Button
        onPress={() => {
          deleteData(item.id);
          console.log("this is the ID: ", item.id);
        }}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DisplayScreen;
