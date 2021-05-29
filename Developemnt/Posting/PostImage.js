import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import {Button} from './Button';

import * as ImagePicker from "react-native-image-picker";

export default function ImagePickerPost() {
  const [response, setResponse] = React.useState([]);

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "red",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#651d32",
            width: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            ImagePicker.launchCamera(
              {
                mediaType: "photo",
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              }
            )
          }
        >
          <Text
            style={{
              color: "white",
              textTransform: "uppercase",
            }}
          >
            Take Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "red",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#651d32",
            width: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                mediaType: "photo",
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              }
            )
          }
        >
          <Text
            style={{
              color: "white",
              textTransform: "uppercase",
            }}
          >
            Select Image
          </Text>
        </TouchableOpacity>

        <View style={styles.response}></View>

        {response && (
          <View style={styles.image}>
            <Image
              style={{ width: 200, height: 200 }}
              // source={{uri: response.uri}}
              source={response}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
});
