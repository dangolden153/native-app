import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Register from './screens/Register'
import HomeScreen from './screens/HomeScreen'
import AddChat from './screens/AddChat'
import ChatScreen from './screens/ChatScreen'



const Stack = createStackNavigator();
const globalScreenOptions ={
  headerStyle: {backgroundColor: '#2c6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: "white"
}

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}> 
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen  name="Home" component={HomeScreen} />
      <Stack.Screen  name="AddChat" component={AddChat} />
      <Stack.Screen   name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});
