import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView,Platform } from "react-native";
import { Button, Input } from "react-native-elements";
import {Auth} from '../firebase'
import pics from "../pictures/pics1.jpg";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
     const unSubscribe = Auth.onAuthStateChanged(user => {
          if(user){
              navigation.replace("Home")
              console.log(user)
          }
      })
      return unSubscribe;
  }, []);

  const login = () => {
    Auth
    .signInWithEmailAndPassword(email, password)
    .then(res => alert(res)) 
    .catch(err => console.log(err))
  };

  return (
    <KeyboardAvoidingView  
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={styles.container}>
      <StatusBar style="light" />
      {/* <Image
        source={{ uri: pics }}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      /> */}

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email" 
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={login}
        />
      </View>

      <View>
        <Button title="Login" containerStyle={styles.button} onPress={login} />
        
        <View
          style={{ fontSize: 12, marginTop: 10, marginBottom: 10 }}
        >
          <Text>
          you don't have an account ?
          </Text>
        </View>

        <Button
          title="Register"
          containerStyle={styles.button}
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }, 

  inputContainer: {
    width: 300,
    marginBottom: 15,
  },

  button: {
    width:200,
    
  },

 
});
