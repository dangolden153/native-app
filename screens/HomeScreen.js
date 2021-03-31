import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import pics from "../pictures/pics3.jpg";
import svg from "../pictures/whatsapp.svg";
import svg1 from "../pictures/facebook.svg";
import {db, Auth} from '../firebase'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import ListItems from "../component/ListItems";









const HomeScreen = ({ navigation }) => {

  const [chat, setchat] = useState([]);

  const signOut = () => {
    alert("signed out !!!");
    Auth.signOut()
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dangolden Tech",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10}}>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            {/* <Avatar rounded source={{ uri: pics }} /> */}
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 70,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
          onPress={signOut}
          activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='black'/>
            
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name='pencil' size={24} color='black' />
            
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const unSubcribe = db.collection("chats").onSnapshot(snapshot => {
      setchat(snapshot.docs.map(doc => ({
          id: doc.id,
          chatData: doc.data()
      })))
    });

    return unSubcribe;

  }, [setchat]);

  console.log(chat)
   
  const enterChat =(id, chatName )=>{
      navigation.navigate("Chat", {
          id,
          chatName
      })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          {chat.map(({id, chatData:{chatName}})=>
          <ListItems key={id} id={id} chatName={chatName} enterChat={enterChat} /> ) 
           }

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
      height: "100%"
    }
})
