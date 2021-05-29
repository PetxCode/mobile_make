import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { Avatar } from "react-native-elements";
import ViewCreatedBy from "./ViewCreatedBy";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { app } from "../../base";
import { BackgroundImage } from "react-native-elements/dist/config";
import { TextInput } from "react-native-gesture-handler";
import RecentlyBook from "./RecentlyBook";

const HomeScreen = ({ onPress, title, navigation }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("studio")
      .onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setData(i);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 400,
              height: 250,
              borderRadius: 30,
              justifyContent: "center",
            }}
          >
            <BackgroundImage
              source={require("../../assets/peter.jpg")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 30,
                // alignSelf: "flex-start",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/image/1.png")}
                resizeMode="contain"
                style={{
                  // marginTop: 60,
                  width: 60,
                  height: 60,
                  // alignSelf: "flex-start",
                }}
              />
              <Text
                style={{
                  marginTop: 0,
                  width: 250,
                  // height: 60,
                  color: "#651E32",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Booking Your Favorite Studios and Equipments Now a Breeze!
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "lightgray",
                  width: 250,
                  position: "relative",
                }}
              >
                <MaterialCommunityIcons
                  name="search-web"
                  size={20}
                  color={"#651E32"}
                  style={{ marginRight: 2, marginLeft: 10 }}
                />
                <TextInput
                  style={{
                    width: 200,
                    height: 35,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontWeight: "bold",
                    color: "#651E32",
                  }}
                  placeholder="Search"
                />
              </View>
            </BackgroundImage>
          </View>
        </View>
        <RecentlyBook />
        <View
          style={{
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 100,
                height: 35,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  color: "#651E32",
                  fontSize: 13,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Cameras
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 100,
                height: 35,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  color: "#651E32",
                  fontSize: 13,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Toolings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 100,
                height: 35,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  color: "#651E32",
                  fontSize: 13,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Studios
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Detailed", item);
                  console.log("Tapped for Detail");
                }}
              >
                <View
                  style={{
                    marginBottom: 30,
                    marginTop: 10,
                    backgroundColor: "#EDEDED",
                    margin: 20,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ zIndex: 1, position: "relative", top: 20 }}>
                    <ViewCreatedBy
                      createdBy={item.createdBy}
                      createdAt={item.createdAt}
                      name={item.name}
                      time={item.time}
                    />
                  </View>

                  <View
                    style={{
                      margin: 0,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.img,
                      }}
                      style={styles.img2}
                      // resizeMode="contain"
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                      }}
                    >
                      <View style={styles.inLine}>
                        <Text style={styles.inText}>Cost</Text>
                        <Text style={styles.inText2}>{item.cost}</Text>
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
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inLine: {
    alignItems: "center",
    justifyContent: "center",
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
  img: {
    width: 70,
    height: 70,
    borderRadius: 100,
    // top: 20,
    // border: "2px solid tomato",
  },
  img2: {
    // flex: 1,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
    // backgroundColor: "lightgray",
  },
});

export default HomeScreen;
