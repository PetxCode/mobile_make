import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Paragraph, TextInput } from "react-native-paper";

const DetailScreen = ({ route }) => {
  const data = route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Detail Page</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          <Text style={styles.text}>{data.name}</Text>

          <TouchableOpacity
            onPress={() => {
              console.log("Ready to be Booked");
            }}
          >
            <Text style={styles.text2}>Book</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/peter.jpg")}
          source={{ uri: data.img }}
          style={styles.img}
        />
        <Text
          style={{
            marginLeft: 30,
            marginTop: 20,
            marginBottom: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {" "}
          Details:{" "}
        </Text>
        <Paragraph style={styles.para}>{data.desc}</Paragraph>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <View style={styles.inLine}>
            <Text style={styles.inText}>Cost</Text>
            <Text style={styles.inText2}>#{data.cost}</Text>
          </View>

          <View style={styles.inLine}>
            <Text style={styles.inText}>comments</Text>
            <Text style={styles.inText2}>0</Text>
          </View>
          <View style={styles.inLine}>
            <Text style={styles.inText}>Rating</Text>
            <Text style={styles.inText2}>4.5</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", margin: 20 }}>
          <Text>Do here Button heer!</Text>
        </View>
        <View>
          <TextInput
            style={{
              margin: 10,
            }}
            placeholder="Comment"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "lightgray",
              width: 300,
              height: 40,
              borderRadius: 5,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textTransform: "uppercase",
                fontSize: 16,
              }}
            >
              {" "}
              post comment{" "}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "90%",
    height: 300,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  inText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  inText2: {
    // color: "lightgray",
    fontSize: 10,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    // alignSelf: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "tomato",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    color: "white",
    borderRadius: 5,
  },
  para: {
    margin: 20,
    fontSize: 14,
  },
  inLine: {
    alignItems: "center",
    justifyContent: "center",
  },
  inText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailScreen;
