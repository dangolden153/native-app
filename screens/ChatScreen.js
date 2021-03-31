import React, { useLayoutEffect,useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
 
  
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar,Button,Input } from "react-native-elements";
import pics from "../pictures/pics4.jpg";
import {db, Auth} from '../firebase'
import  firebase from 'firebase'


import ChatItems from '../component/ChatItems'



const ChatScreen = ({ navigation, route }) => {

const [message, setMessage] = useState("")
const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerBackTitleVisible: false,

      headerTitle: () => (
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.headerContainer}>
            <Avatar rounded source={{ uri: pics }} />

            <Text style={{ marginLeft: 20, color: "white", fontWeight: "700" }}>
              {route.params.chatName}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const unSubscribe = db.collection("chats").doc(route.params.id).collection("message")
    .orderBy("timeStamp", "asc")
    .onSnapshot(snapshot=>{
        setMessages(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data()
        })))
    })
      return () => {
          unSubscribe
      }
  }, [setMessages])

  console.log(messages)

  const sendMessage= async ()=>{
    await db.collection('chats').doc(route.params.id).collection("message")
    .add({
      message : message,
      // userName: Auth.currentUser.displayName,
      // photoURL: Auth.currentUser.photoURL,
      // email: Auth.currentUser.email,
      timeStamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(res =>{
         alert('message sent sucessfully')
         Keyboard.dismiss()

    }) .catch(err => console.log(err))
      
      
  }






  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <>

          <ScrollView contentContainerStyle={{paddingTop:15}}>
            {messages.map(({id,data}) =>(
            <ChatItems id={id} key={id} data={data} />
            // <View key={id}>
            //   <Text>{data.message}</Text>
            // </View>
          ))}
          </ScrollView>

          <View style={styles.footer}>
            <TextInput
              placeholder="type a message ..."
              type={message}
              onChangeText={(text) => setMessage(text)}
              onSubmitEditing={sendMessage}
              style={styles.textinput}
            />
            <TouchableOpacity activeOpacity={0.5}>
            <Button title="Send" onPress={sendMessage} style={{ width: 80 }} />
            </TouchableOpacity>
          </View>

        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },

  container:{
    flex: 1,
  },

  footer:{
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: 20
  },

  textinput:{
      bottom: 0,
      height:40,
      padding:10,
      color: 'grey',
      backgroundColor: "#ECECEC",
      borderRadius: 30,
      flex: 1,
      borderColor: 'transparent',
      marginRight: 15,
      borderWidth: 1
  }
});
