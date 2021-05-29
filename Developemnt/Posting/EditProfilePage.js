import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { app } from '../../base';
import { AuthContext } from '../AuthPath/AuthState';
import * as ImagePicker from "expo-image-picker"
import { Button } from 'react-native';
import { Image } from 'react-native';
import firebase from "firebase"
import { ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const EditProfilePage = ({navigation}) => {

  const { current } = useContext(AuthContext);
  const[userFile, setUserFile] = useState([])
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessLocation, setBusinessLocation] = useState('')
  const [businessDesc, setBusinessDesc] = useState('')
  const [image, setImage] = useState(null);
  const [pushImage, setPushImage] = useState(null);
  const [uploading, setUploading] = useState(false)



  const updateProfile = async() => {
    const user = app.auth().currentUser
    if(user){
         await app.firestore().collection("user24").doc(user.uid)
         .update({
          name: name !== "" ? name : userFile.name ,
          first: name.charAt(0),
          businessName, 
          businessLocation,
          businessDesc,
          avatar: image,
          avatar1: pushImage,
         })

        //  navigation.pop()
    }
  }

  const setMyImages = async() => {
    const user = app.auth().currentUser
    if(user){
         await app.firestore().collection("img").doc(user.uid)
         .set({
          image
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



  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

const pushToFirebase = async() => {
  const blob = await new Promise((resolve, reject)=> {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      reject(new TypeError("Network request Failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", image, true)
    xhr.send(null)
  })

  const ref = app.storage().ref().child(new Date().toISOString())
  const snapshot = ref.put(blob)


  snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
    setUploading(true)
  },
  (error)=> {
    setUploading(false)
    console.log(error)
    blob.close()
      return
  },
  () => {
    snapshot.snapshot.ref.getDownloadURL().then(downloadURL => {
    setUploading(false)
    setPushImage(downloadURL)
      console.log("url: ", downloadURL)
      console.log("url-Image: ", pushImage)
      blob.close()
      
      return  downloadURL
    })
  }
  
  )



}

  
  return (
 <ScrollView>
    
  <View>
      <View
      style={{margin:30}} 
      >
        <TouchableOpacity

style={{
  backgroundColor:"#651E32",
  justifyContent:"center",
  alignItems:"center",
  height:40,
  borderRadius:4
}}
onPress={pickImage}  
>
  <Text
  style={{
   color:"white",
   fontSize:16,
   fontWeight:"bold",
   textTransform:"uppercase"

 }}
  >
  Choose Your Avatar
  </Text>
</TouchableOpacity>
       

{
  image ?  <Image  
  source={{uri: image}}
  resizeMode="contain"
  style={{
    width: 300,
    height: 250,
    borderRadius:5,
    // marginTop:10, backgroundColor:"lightblue"
  }}

/>: null
}
 
 
{  image ? 
 <View> 
    <TouchableOpacity
    onPress={()=>{
      setImage(null)
    }}
    style={{
      width:300,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#651E32",
      height:30,
      borderRadius:4
    }}
    >
     <Text
     style={{
       color:"white",
       fontSize:16,
       fontWeight:"bold",
       textTransform:"uppercase"

     }}
     >Reset</Text>
    </TouchableOpacity>
   </View> : null
}
</View>

<View>
  
  <View>
  <TextInput
                    placeholder="User Preferred Name"
                    style={{
                      marginTop:5,
                      marginBottom:5,
                      marginLeft:30,
                      marginRight:30,
                      backgroundColor:"lightblue",
                      height:40,
                      paddingLeft:10,
                      borderRadius:3
                    }}
                    value={name}
                    onChangeText={setName}
                  />
  </View>

  
  <View>
  <TextInput
                    placeholder="Business Name"
                    style={{
                      marginTop:5,
                      marginBottom:5,
                      marginLeft:30,
                      marginRight:30,
                      backgroundColor:"lightblue",
                      height:40,
                      paddingLeft:10,
                      borderRadius:3
                    }}
                    value={businessName}
                    onChangeText={setBusinessName}
                  />
  </View>

  
  <View>
  <TextInput
                    placeholder="Business Location"
                    style={{
                      marginTop:5,
                      marginBottom:5,
                      marginLeft:30,
                      marginRight:30,
                      backgroundColor:"lightblue",
                      height:40,
                      paddingLeft:10,
                      borderRadius:3
                    }}
                    value={businessLocation}
                    onChangeText={setBusinessLocation}
                  />
  </View>

  
  <View>
  <TextInput
                    placeholder="Business Description"
                    style={{
                      marginTop:5,
                      marginBottom:5,
                      marginLeft:30,
                      marginRight:30,
                      backgroundColor:"lightblue",
                      height:40,
                      paddingLeft:10,
                      borderRadius:3
                    }}
                    value={businessDesc}
                    onChangeText={setBusinessDesc}
                  />
  </View>


</View>
    

      <View style={{margin:30}} >
         {
           uploading ?  <ActivityIndicator size="large" color="red" /> : 
           
           <TouchableOpacity

           style={{
             backgroundColor:"#651E32",
             justifyContent:"center",
             alignItems:"center",
             height:40,
             borderRadius:4
           }}

           onPress={()=>{
            pushToFirebase(),
            updateProfile()
           
           }} 
           >
             <Text
             style={{
              color:"white",
              fontSize:16,
              fontWeight:"bold",
              textTransform:"uppercase"
       
            }}
             >
             Upload Profile
             </Text>
           </TouchableOpacity>
         }
       
       </View>
    </View>
   
  
 </ScrollView>
  )
}

export default EditProfilePage

const styles = StyleSheet.create({})
