import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { app } from '../../base';

const CommentPostImage = ({item}) => {

  const [data, setData] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("user24")      
      .doc(item.commentBy)
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
    <View
    style={{
      marginLeft:30
    }}
    >
     <View>
       {
         data.avatar1 ? (
          <Image
          source={data && data.avatar1}
          resizeMode="cover"
          style={{
            width:50,
            height:50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: "#651E32"
          }}
        />
         ) : (
           <View
           style={{
             width:40,
             height:40,
             borderRadius: 20,
             borderWidth: 2,
             borderColor: "#651E32",
             justifyContent:"center",
             alignItems:"center"
           }}
           > 
             <Text>{data && data.firstLetter}</Text>
           </View>
         )
       }
     </View>
      {/* <Text>{data && data.name}</Text> */}
    </View>
  )
}

export default CommentPostImage

const styles = StyleSheet.create({})
