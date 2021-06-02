import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import PaystackWebView from 'react-native-paystack-webview';
import {v4 as uuid} from "uuid"
import { app } from '../../base';
import { AuthContext } from '../AuthPath/AuthState';


const PaymentPlan = ({route}) => {
const {current} = useContext(AuthContext)
  // const newData = route.params;
  // const days = route.params;
  const {counter, bestData} = route.params;

  const [info, setInfo] = useState(null)

  const viewProfile = async() => {
    const user = app.auth().currentUser
    if(user){
      await app.firestore().collection("user24").doc(user.uid).get()
    .then(doc => {
      setInfo(doc.data())
    })
    }
  }

  useEffect(()=>{
    viewProfile()
    
  },[])

  return (
    <View
    style={{
      justifyContent:"flex-start",
      // backgroundColor:"red",
      alignItems:"flex-start",
      // marginBottom:300
      marginLeft:20
    }}
    >
      <Text
style={{
  marginBottom:30
}}
>Here is your bill information</Text>
<Text
style={{
  fontWeight:"bold",
  marginBottom:10
}}
>Billing Name: {info && info.name}
</Text>
<Text
style={{
  fontWeight:"bold",
  marginBottom:10
}}
>Billing email: {info && info.email}
</Text>
<Text
style={{
  fontWeight:"bold",
  marginBottom:10
}}
>Billing Cost: #{bestData && parseInt(bestData.cost * parseInt(counter) )}
</Text>
<Text
style={{
  fontWeight:"bold",
  marginBottom:10
}}
>Billing Teams and Condition: This is to Notify that .......
</Text>

      <View 
      style={{        
        width:80,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"lightgreen",
        color:"white",
        borderRadius:3,
        marginTop:40,

        // borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#ddd',
        // // borderBottomWidth: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,  
        }}>



<PaystackWebView
        buttonText="Pay Now"
        showPayButton={true}
        paystackKey="pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18"
        amount={ parseInt(bestData.cost * parseInt(counter)) }
        billingEmail= {info.email}
        billingMobile="09787377462"
        billingName= {info.name}
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 10 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={false}
      />
    </View>
    
    </View>
  )
}

export default PaymentPlan

const styles = StyleSheet.create({})
