import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import moment from "moment";

import { app } from "../../base";
import { ScrollView } from "react-native-gesture-handler";
import { fonts } from "react-native-elements/dist/config";

const ViewCreatedBy = ({ createdBy, createdAt, name, time, item }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("user24")      
      .doc(createdBy)
      .get()
      .then((doc) => {
        setData(doc.data());
        // console.log(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          marginBottom: 25,
          marginTop: 0,
        }}
      >
        {
          data ? 
          <Image source={{ uri: data && data.avatar1 }} style={styles.img} /> : 
          <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: "#651E32",
            justifyContent:"center",
            alignItems:"center"
          }} 
          >
                <Text>{ data && data.firstLetter }</Text>
           </View> 
        }

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {data && data.businessName}
          </Text>
         
          <Text
          style={{
            fontWeight:"bold",
            fontSize:11
          }}
          >contact email: {data && data.email} </Text>
           <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {moment(createdAt.toDate()).fromNow()}
          </Text>
          <Text
          style={{
            fontWeight:"bold",
            fontSize:11,
            color: "#651E32"
          }}
          >Category: {item.language} </Text>
     
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inLine: {
    alignItems: "center",
    justifyContent: "center",
  },
  inText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  img: {
    width: 70,
    height: 70,
    // top: 40,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#651E32",
  },
  img2: {
    // flex: 1,
    width: 400,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    // backgroundColor: "lightgray",
  },
});

export default ViewCreatedBy;
