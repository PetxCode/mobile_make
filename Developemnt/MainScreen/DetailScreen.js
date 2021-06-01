import React, {useState, useEffect, useContext} from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  TextInput
} from "react-native";
import { colors } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Paragraph,  } from "react-native-paper";
import { app } from "../../base";
import { AuthContext } from "../AuthPath/AuthState";
import firebase from "firebase"
import moment from "moment"
import CommentPostImage from "./CommentPostImage";
import {Picker} from '@react-native-picker/picker';







const DetailScreen = ({ route }) => {
  const {current} = useContext(AuthContext)
  const data = route.params;
const [comment, setComment] = useState("")
const [feedBack, setFeedBack] = useState([])
const [days, setDays] = useState("");

const makeFeedBack = async() => {
  const resData = app.auth().currentUser

  if(resData){
    await app.firestore().collection("studio").doc(data.id).collection("feedback").doc().set({
      commentBy: resData.uid,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      comment,
    })
    setComment("")
  }
}

const viewFeedBack = async () => {
  await app.firestore().collection("studio")
  .doc(data.id).collection("feedback")
  .orderBy("date", "desc")
  .onSnapshot(snapshot => {
    const r =[]
    snapshot.forEach(doc => {
      r.push({...doc.data(), id: doc.id})
    })
    setFeedBack(r)
  })
}


useEffect(()=>{
  viewFeedBack()
}, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
            marginRight: 20,
            marginLeft: 20,
          }}
        >
        
          <Text style={styles.text}>{data.name}</Text>

          {/* <TouchableOpacity
            onPress={() => {
              console.log("Ready to be Booked");
            }}
          >
            <Text style={styles.text2}>Book</Text>
          </TouchableOpacity> */}
        </View>
        <Image
          source={{ uri: data.coverImage }}
          style={styles.img}
        />

      <View style={{
                      flexDirection:"row",
                      justifyContent: "space-evenly",
                    }} >
                      <Image
                        source={{uri: data.SideImage1}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                      <Image
                        source={{uri: data.SideImage2}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                      <Image
                        source={{uri: data.SideImage3}}
                        style={{
                          width:100,
                          height:80,
                          borderRadius:3,
                          marginTop: 5,

                        }}
                      />
                    </View>
                    
        
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
          Description:{" "}
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
            <Text style={styles.inText}>Cost/day</Text>
            <Text style={styles.inText2}>#{data.cost}</Text>
          </View>

          <View style={styles.inLine}>
            <Text style={styles.inText}>Feedback</Text>
            <Text style={styles.inText2}>{feedBack.length}</Text>
          </View>
          <View style={styles.inLine}>
            <Text style={styles.inText}>Rating</Text>
            <Text style={styles.inText2}>4.5</Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", margin: 20, justifyContent:"center", alignItems:"center" }}>
          <View
           style={{
            marginTop:10,  
            width:300,
            height:40,
            // marginVertical:10,
            borderWidth:1,
            borderRadius: 3,
            paddingHorizontal:10,
            borderColor: "#651d32",
            justifyContent:"center",
            // alignItems: "center"
            color: "black",
            marginLeft: 30,
            marginRight: 30,
            marginiBottom:30
             }}
          >
                <Picker
                    selectedValue={days}
                    style={{ height: 50, 
                      width: 290,
                      
                    }}
                    onValueChange={(itemValue, itemIndex) => setDays(itemValue)}>
                    <Picker.Item label="How long would you want to hire this Product" value="1"
                    
                    />
                    <Picker.Item label="1 day" value="1" />
                    <Picker.Item label="2 days" value="2" />                  
                    <Picker.Item label="3 days" value="3" />                  
                    <Picker.Item label="4 days" value="4" />                  
                    <Picker.Item label="5 days" value="5" />                  
               </Picker>
          </View>
                  <View
                  style={{
                    justifyContent:'center',
                    alignItems:"center"
                  }}
                  >
                    <Text>Your Charge</Text>
                    <Text>{
                      days !== "" ? <Text> {data.cost * parseInt(days)} </Text> : null
                      }</Text>
                      <View>
                        {
                          days !== "" ? (
                            <TouchableOpacity
                              style={{
                                width:100,
                                height:30,
                                backgroundColor:"#651d32",
                                justifyContent:"center",
                                alignItems:"center",
                                borderRadius:5

                              }}
                            >
                              <Text
                              style={{
                                color:"white",
                                textTransform:"uppercase",
                                fontWeight:"bold"
                              }}
                              >Pay</Text>
                            </TouchableOpacity>
                          ): null
                        }
                      </View>
                  </View>

          <Text
          style={{
            marginTop:40
          }}
          >We will love to Have your Feedback, Please sign in to do so! </Text>
        
      <View
        style={{
          width:300,
          justifyContent:"center",
          alignItems:"center"
        }}
        >
        <TextInput
            placeholder="What's your FeedBack?"
            style={{
              width:300,
              height:40,
              marginVertical:10,
              borderWidth:1,
              borderRadius: 3,
              paddingHorizontal:10,
              borderColor: "#651d32",
              justifyContent:"center"
            }}
            value={comment}
            onChangeText={setComment}
          />

        {
          current ? (
            <TouchableOpacity
            style={{
              backgroundColor: "#651E32",
              width: 300,
              height: 40,
              borderRadius: 5,
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={()=>{
              makeFeedBack()
              console.log("Tapped")
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textTransform: "uppercase",
                fontSize: 16,
                fontSize: 13,
                fontWeight:"bold",
                textAlign: "center",
                color:"white"
              }}
            >
              {" "}
              post comment{" "}
            </Text>
          </TouchableOpacity>
        
          ):(
            <TouchableOpacity
            style={{
              backgroundColor: "#651E32",
              width: 300,
              height: 40,
              borderRadius: 5,
              justifyContent: "center",
              alignSelf: "center",
              color: "white"
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textTransform: "uppercase",
                fontSize: 13,
                fontWeight:"bold",
                textAlign: "center",
                color: "whi"
              }}
            >
      
              Become a Memeber to post comment
            </Text>
          </TouchableOpacity>
        
          )
        }  
          
          <View 
          style={{ 
            marginTop: 20,
             }} />
                 
        </View>       
       </View>  

      <View>
    
      <View>
        <FlatList 
        data={feedBack}
        keyExtractor={(item) => item.id}
          renderItem={({item}) => (
              <View
              style={{
                flexDirection:"row", margin:5, alignItems:"center"
              }}
              > 
                <CommentPostImage item={item} />
                <Text
                style={{
                  marginLeft:10,
                  backgroundColor:"#ebced6",
                  width:245,
                  height:50,
                  borderRadius:5,
                  padding:5
                }}
                >{item.comment}</Text>
                </View>
          )}
        />
      </View>
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
    backgroundColor: "#651E32",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    color: "white",
    borderRadius: 5,
  },
  para: {
    margin: 10,
    fontSize: 14,
    marginLeft: 35,
    // marginTop: 10,
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
