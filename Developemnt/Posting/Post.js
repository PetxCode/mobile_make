import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import img1 from "../../assets/peter.jpg";
// import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker"

import firebase from "firebase";
import { app } from "../../base";
import { AuthContext } from "../AuthPath/AuthState";
import ImagePickerPost from "./PostImage";
import PickerPick from "./NewImagePost";
import {Picker} from '@react-native-picker/picker';
import { ActivityIndicator } from "react-native";



const studio = app.firestore().collection("studio");
const Post = () => {
  const { mgs, currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [language, setLanguage] = useState("Studio Space");

  const [image, setImage] = useState(null);
  const [myImage, setMyImage] = useState(null);

  const [image1, setImage1] = useState(null);
  const [myImage1, setMyImage1] = useState(null);

  const [image2, setImage2] = useState(null);
  const [myImage2, setMyImage2] = useState(null);

  const [image3, setImage3] = useState(null);
  const [myImage3, setMyImage3] = useState(null);

 

  const [uploading, setUploading] = useState(false)

  const pushOnline = async () => {
    const presentUser = app.auth().currentUser;

    if (presentUser) {
      await studio.doc().set({
        coverImage: myImage,
        SideImage1: myImage1,
        SideImage2: myImage2,
        SideImage3: myImage3,
        language,
        location,
        name,
        cost,
        desc,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: presentUser.uid,
      });

      setName('')
      setDesc('')
      setCost('')
      setLocation('')
      setCoverImage(null)
      setImag2(null)
      setImag3(null)
      setImage1(null)
    }
  };

  const imagePush = async() => {
    await app.firestore().collection("pushImage").doc().set({
      img: myImage
    })
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

  

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage1(result.uri);
    }
  };

const pushToFirebase1 = async() => {
  const blob = await new Promise((resolve, reject)=> {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      reject(new TypeError("Network request Failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", image1, true)
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
    setMyImage1(downloadURL)
      console.log("url: ", downloadURL)
      console.log("url-Image: ", myImage1)
      blob.close()
      
      return  downloadURL
    })
   }
  )
}



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
    setMyImage(downloadURL)
      console.log("url: ", downloadURL)
      console.log("url-Image: ", myImage)
      blob.close()
      
      return  downloadURL
    })
   }
  )
}



  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage2(result.uri);
    }
  };

const pushToFirebase2 = async() => {
  const blob = await new Promise((resolve, reject)=> {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      reject(new TypeError("Network request Failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", image2, true)
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
    setMyImage2(downloadURL)
      console.log("url: ", downloadURL)
      console.log("url-Image: ", myImage2)
      blob.close()
      
      return  downloadURL
    })
   }
  )
}



  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage3(result.uri);
    }
  };

const pushToFirebase3 = async() => {
  const blob = await new Promise((resolve, reject)=> {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      reject(new TypeError("Network request Failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", image3, true)
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
    setMyImage3(downloadURL)
      console.log("url: ", downloadURL)
      console.log("url-Image: ", myImage3)
      blob.close()
      
      return  downloadURL
    })
   }
  )
}



  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.response}>
        
        <View
          style={{
            marginTop:40,
            justifyContent:"space-evenly",
            flexDirection:"row",
            height:140,
          
         
          }}
          >
           <View>
           {
              image ? (
                  <Image
               source={{uri: image}}
               style={{
               width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
                    }}
                  />
              ): (
                <TouchableOpacity
            style={{
              width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
            }}
            onPress={pickImage}
            >
                <Text>Cover Image</Text>
              </TouchableOpacity>
              )
            }

{  image ? 
 <View
 style={{
   marginTop:10,
  justifyContent:"center",
  alignItems:"center",
 }}
 > 
    <TouchableOpacity
    onPress={()=>{
      setImage(null)
    }}
    style={{
      width:80,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#651E32",
      height:30,
      borderRadius:4,

    }}
    >
     <Text
     style={{
       color:"white",
       fontSize:12,
     }}
     >Reset</Text>
    </TouchableOpacity>
   </View> : null
}
</View>



  <View
            style={{
              height:140
            }}
           >
            {
              image1 ? (
                  <Image
                    source={{uri: image1}}
                    style={{
                      width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
                    }}
                  />
              ): (
                <TouchableOpacity
            style={{
              width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
            }}
            onPress={pickImage1}
            >
                <Text>Size View 1</Text>
              </TouchableOpacity>
              )
            }
            {  image1 ? 
 <View
 style={{
   marginTop:10,
  justifyContent:"center",
  alignItems:"center",
 }}
 > 
    <TouchableOpacity
    onPress={()=>{
      setImage1(null)
    }}
    style={{
      width:80,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#651E32",
      height:30,
      borderRadius:4,

    }}
    >
     <Text
     style={{
       color:"white",
       fontSize:12,
     }}
     >Reset</Text>
    </TouchableOpacity>
   </View> : null
}
           </View>
          </View>
        
        
        <View
          style={{
            marginTop:20,
            justifyContent:"space-evenly",
            flexDirection:"row",
            height:140,
          
         
          }}
          >
           <View>
           {
              image2 ? (
                  <Image
               source={{uri: image2}}
               style={{
               width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
                    }}
                  />
              ): (
                <TouchableOpacity
            style={{
              width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
            }}
            onPress={pickImage2}
            >
                <Text>Side View 2</Text>
              </TouchableOpacity>
              )
            }

{  image2 ? 
 <View
 style={{
   marginTop:10,
  justifyContent:"center",
  alignItems:"center",
 }}
 > 
    <TouchableOpacity
    onPress={()=>{
      setImage2(null)
    }}
    style={{
      width:80,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#651E32",
      height:30,
      borderRadius:4,

    }}
    >
     <Text
     style={{
       color:"white",
       fontSize:12,
     }}
     >Reset</Text>
    </TouchableOpacity>
   </View> : null
}
</View>



  <View
            style={{
              height:140
            }}
           >
            {
              image3 ? (
                  <Image
                    source={{uri: image3}}
                    style={{
                      width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
                    }}
                  />
              ): (
                <TouchableOpacity
            style={{
              width:120,
              height:100,
              borderRadius:5,
              borderWidth:2,
              borderColor: "#651E32",
              justifyContent:"center",
              alignItems:"center"
            }}
            onPress={pickImage3}
            >
                <Text>Size View 3</Text>
              </TouchableOpacity>
              )
            }
            {  image3 ? 
 <View
 style={{
   marginTop:10,
  justifyContent:"center",
  alignItems:"center",
 }}
 > 
    <TouchableOpacity
    onPress={()=>{
      setImage3(null)
    }}
    style={{
      width:80,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#651E32",
      height:30,
      borderRadius:4,

    }}
    >
     <Text
     style={{
       color:"white",
       fontSize:12,
     }}
     >Reset</Text>
    </TouchableOpacity>
   </View> : null
}
           </View>
          </View>
        
    
        </View>
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
            marginRight: 30
             }}
          >
         
                  <Picker
                    selectedValue={language}
                    style={{ height: 50, 
                      width: 290,
                      
                    }}
                    onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
                    <Picker.Item label="Studio Equipement" value="Studio Equipement" />
                    <Picker.Item label="Studio Space" value="Studio Space" />                  
               </Picker>
          </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
            marginLeft: 30,
            marginRight: 30
          }}
        >
          
          <TextInput
            placeholder="Item Name"
            style={{
              width:300,
              height:40,
              marginVertical:10,
              borderWidth:1,
              borderRadius: 3,
              paddingHorizontal:10,
              borderColor: "#651d32"
            }}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Item Cost"
            style={{
              width:300,
              height:40,
              marginVertical:10,
              borderWidth:1,
              borderRadius: 3,
              paddingHorizontal:10,
              borderColor: "#651d32"
            }}
            value={cost}
            onChangeText={setCost}
          />
          <TextInput
            placeholder="Item Location"
            style={{
              width:300,
              height:40,
              marginVertical:10,
              borderWidth:1,
              borderRadius: 3,
              paddingHorizontal:10,
              borderColor: "#651d32"
            }}
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            placeholder="Item Description"
            style={{
              width:300,
              height:40,
              marginVertical:10,
              borderWidth:1,
              borderRadius: 3,
              paddingHorizontal:10,
              borderColor: "#651d32"
            }}
            value={desc}
            onChangeText={setDesc}
          />

          {
           uploading ?  <ActivityIndicator size="large" color="red" /> : 
           
           <TouchableOpacity

           style={{
             backgroundColor:"#651E32",
             justifyContent:"center",
             alignItems:"center",
             height:40,
             borderRadius:4,
             width:250
           }}

           onPress={()=>{                     
            
            pushToFirebase(),
            pushToFirebase1(),
            pushToFirebase2(),
            pushToFirebase3(),
            pushOnline(),
            console.log("This is the Image URI: ", myImage)
            console.log("This is the Image1 URI: ", myImage1)
            console.log("This is the Image2 URI: ", myImage2)
            console.log("This is the Image3 URI: ", myImage3)
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
             Push Online
             </Text>
           </TouchableOpacity>
         }


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  image: {
    marginVertical: 24,
    alignItems: "center",
  },
  response: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 5,
    height: 50,
    width: 350,

    fontSize: 13,
  },
});

export default Post;
