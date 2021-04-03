import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { Auth } from "../firebase";
import { Avatar } from "react-native-elements";
import pics from "../pictures/pics3.jpg";




const ChatItems = ({ data, id }) => {
  const { message, email, photoURL, timeStamp, userName } = data;

  console.log(Auth.currentUser);
  console.log(email);
  return (
    <View style={styles.container}>
      {email === Auth?.currentUser?.email ? (
        <View key={id} style={styles.reciever}>
          {/* <Avatar
            /// web
            style={{
              position: "absolute",
              bottom: -17,
              right: -5,
              bottom: -17,
              right: -13,
            }}
            rounded
            ///mobile
            position="absolute"
            bottom={-17}
            right={-5}
            source={{ uri: pics }}
          /> */}

          <Text style={styles.recieverText}>{message}</Text>
          <Text style={styles.recieverName}>{userName}</Text>
        </View>
      ) 
      
      : (
        <View style={styles.sender}>
          {/* <Avatar
            /// web
            style={{
              position: "absolute",
              bottom: -17,
              bottom: -17,
              right: -13,
            }}
            rounded
            ///mobile
            position="absolute"
            bottom={-17}
            right={-3}
            source={{ uri: pics }}
          /> */}
          <Text style={styles.senderText}>{message}</Text>
          <Text style={styles.senderName}>{userName}</Text>
        </View>
      )}
    </View>
  );
};

export default ChatItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  reciever: {
    padding: 15,
    marginBottom: 20,
    marginRight: 20,
    borderRadius: 20,
    maxWidth: "80%",
    alignSelf: "flex-end",
    position: "relative",
    backgroundColor: "#ECECEC",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15
  },

  recieverName:{
    padding: 10,
    right: 10,
    fontSize: 10,
    color: "white"
  },

  sender: {
    padding: 15,
    marginBottom: 20,
    margin: 15,
    borderRadius: 20,
    maxWidth: "80%",
    alignSelf: "flex-start",
    position: "relative",
    backgroundColor: "#2B68E6",
  },
  senderText: {
      color: "white",
      fontWeight: "500",
      marginLeft: 10,
      marginBottom: 15
  },

  senderName: {
   padding: 10,
   left: 10,
   fontSize: 10,
   color: "white"
  },

  
});
