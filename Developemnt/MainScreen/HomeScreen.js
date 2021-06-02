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
  RefreshControl,
} from "react-native";
import moment from "moment";
import { Avatar } from "react-native-elements";
import ViewCreatedBy from "./ViewCreatedBy";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { app } from "../../base";
import { BackgroundImage } from "react-native-elements/dist/config";
import { TextInput } from "react-native-gesture-handler";
import RecentlyBook from "./RecentlyBook";


  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };


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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
              source={require("../../assets/studio1.jpeg")}
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
            marginTop: 30,
            marginBottom: 10,
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
                  padding:10,
                  textAlign:"center"
                }}
              >
                 Studio Equipements
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
                Studio Space
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
                      item={item}
                    />
                  </View>

                  <View
                    style={{
                      margin: 0,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.coverImage,
                      }}
                      style={styles.img2}
                      // resizeMode="contain"
                    />
                    <View style={{
                      flexDirection:"row",
                      justifyContent: "space-evenly",
                    }} >
                      <Image
                        source={{uri: item.SideImage1}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                      <Image
                        source={{uri: item.SideImage2}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                      <Image
                        source={{uri: item.SideImage3}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                    </View>
                    
                    
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text style={styles.inText}>Product name</Text>
                        <Text style={styles.inText2}>{item.name}</Text>
                      </View>

                      <View style={{}}>
                        <Text style={styles.inText}>Location</Text>
                        <Text style={styles.inText2}>{item.location}</Text>
                      </View>
                      <View style={{}}>
                        <Text style={styles.inText}>Cost</Text>
                        <Text style={styles.inText2}>{item.cost}</Text>
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
