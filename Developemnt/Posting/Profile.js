import { useIsFocused } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import { Touchable } from "react-native";
import { SafeAreaView } from "react-native";
import { Text, View, Image, StyleSheet, RefreshControl } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { app } from "../../base";
import { AuthContext } from "../AuthPath/AuthState";



const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const Profile = ({navigation}) => {
  const isFocused = useIsFocused();

  const { current } = useContext(AuthContext);
  const[userFile, setUserFile] = useState([])
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessLocation, setBusinessLocation] = useState('')



  const updateProfile = async() => {
    const user = app.auth().currentUser
    if(user){
         await app.firestore().collection("user24").doc(user.uid)
         .update({

         })
    }
  }

  const viewProfile = async() => {
    const user = app.auth().currentUser
    if(user){
      await app.firestore().collection("user24").doc(user.uid).get()
    .then(data => {
      setUserFile(data.data())
    })
    }
  }

  useEffect(()=>{
    viewProfile()
  },[])

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //    alert('Profile Updated successfully!');
  //   });
  //   return unsubscribe;
  // }, [isFocused]);

 

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
        marginTop: 80,
        justifyContent: "center",
        alignItems: "center",
      }}     
    >
      {
        userFile.avatar ? <Image
        source={{uri: userFile && userFile.avatar1}}
        style={{
          width: 150,
          height: 150,
          borderRadius: 150 / 2,
          borderWidth: 5,
          borderColor: "#651E32",
        }}
         //resizeMode="contain"
      /> : <View
      style={{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 5,
        borderColor: "#651E32",
        justifyContent:"center",
        alignItems:"center"
      }}
      > 
        <Text
        style={{
          fontWeight:"bold",
          fontSize: 60
        }}
        >{userFile && userFile.firstLetter}</Text>
      </View>
      }
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
          // marginTop: 30,
        }}
      >
        <Text>Name: </Text>
        <Text style={styles.text}>{userFile && userFile.name} </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
          // marginTop: 30,
        }}
      >
        <Text>Buiness Name:</Text>
        <Text style={styles.text}>{userFile && userFile.businessName}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
          // marginTop: 30,
        }}
      >
        <Text>Location:</Text>
        <Text style={styles.text}>{userFile && userFile.businessLocation}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
          // marginTop: 30,
        }}
      >
        <Text>Description:</Text>
        <Text style={{
          marginLeft:10
        }}>{userFile && userFile.businessDesc}</Text>

      </View>

      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
  
        }}
      >
       
       <TouchableOpacity
        style={{
          backgroundColor:"#651E32",
          width:150,
          height:30,
          borderRadius:5,
          justifyContent:"center",
          alignItems:"center",
          marginTop:10,
         
        }}
        >
        <Text
          style={{
            color:"white",
            fontWeight:"bold",
            textTransform:"uppercase"
          }}
          onPress={()=>{
            navigation.navigate('EditProfilePage')
          }}
        >Edit your Profile</Text>
        </TouchableOpacity>
     
      </View>


      <View
      style={{
        justifyContent:"center",
        alignItems:"center"
      }}
      >
        <Text
        style={{
          width:"100%",
          justifyContent:"center",
          alignItems:"center",
          marginTop:60, 
          color:"#651E32",
          fontWeight:"bold",
          textTransform:"uppercase"
        }}
        >
          Want to quickly go out?
        </Text>
        <TouchableOpacity
        style={{
          backgroundColor:"#651E32",
          width:100,
          height:40,
          borderRadius:5,
          justifyContent:"center",
          alignItems:"center",
          marginTop:10
        }}
        >
        <Text
          style={{
            color:"white",
            fontWeight:"bold",
            textTransform:"uppercase"
          }}
          onPress={()=>{
            app.auth().signOut()
          }}
        >Sign Out</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  
    </ScrollView>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
});
export default Profile;
