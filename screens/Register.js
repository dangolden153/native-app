import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView,StyleSheet,Platform } from "react-native";
import { Button, Input } from "react-native-elements";
// import {Auth} from '../firebase'
import axios from 'axios'

const Register = ({ navigation }) => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [password, setPassword] = useState("");

  // const register=()=>{
  //   Auth.createUserWithEmailAndPassword(email, password)
  //   .then(AuthUser =>{
  //       AuthUser.user.updateProfile({
  //           displayName: userName,
  //           // photoURL:  "https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg"
  //       })
  //   }) .then (res =>{
  //     navigation.navigate("Home")
  //   })

  //   .catch(err => alert(err.message))
  // }

  const register= async ()=>{
    const formData = new FormData()
        formData.append('name', userName)
        formData.append('email', email)
        formData.append('password', password)
    axios.post("http://localhost:5000/api/users/signup",formData)


    .then(res => {
      alert("sucessfull")
      console.log(res)
      navigation.navigate("Home")

    }) .catch(err => console.log(err))



  //   try {
  //     const response = await fetch("https://dan-chatapp.herokuapp.com/api/users/signup", {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },

  //       body: JSON.stringify({
  //        name: userName,
  //        email: email,
  //        password: password
  //       })
  // }) 
  // .then(res => {
  //   alert("sucessfull")
  //   console.log(res)
  //   navigation.navigate("Home")

  // }) .catch(err => console.log(err))
  // const responseData = await response.json()
  // console.log(responseData)


  // } catch (error) {
  //     console.log(error.message)
  //     setLoadingSpinner(false)
  // }

  

  } 

 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "back to login"
    });
  }, [navigation]);


  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={styles.container}>
      {/* header */}
      <Text h3 style={styles.header}>create a Golden accountss</Text>

      {/* input div (view) */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="username"
          type="text"
          autoFocus
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />

        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}  
        />

        {/* <Input
          placeholder="image URL (optional)"
          type="text"
          autoFocus
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
        /> */}

        <Input
          placeholder="password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* buttons div (view) */}
      <View style={styles.buttonContainer}>
      <Button title="register" raised onPress={register} type='outline' containerStyle={styles.button} />
      <View style={{fontSize:12, marginTop: 10, marginBottom: 10 }}>
        <Text>already have an account?</Text>
        </View>
      <Button title="login" raised onPress={() => navigation.navigate("Login")} containerStyle={styles.button} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
    container :{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        padding: 10,

    },
    header:{
    marginBottom: 20,
    //fontSize: "20px"
    },

    inputContainer:{
        width: 300,
        marginBottom:15
    },

    buttonContainer:{
        alignItems: "flex-start",
        width: 200,
        
    },

    button:{
        width: "100%",
        
    }
})