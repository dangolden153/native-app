import React, {useLayoutEffect, useState} from 'react'
import { View, Text, KeyboardAvoidingView,StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import {db} from '../firebase'
const AddChat = ({navigation}) => {

    const [text, setText] = useState('')

    const createChat = async () =>{
        await db.collection("chats").add({
            chatName : text

        }) .then(response =>{
            navigation.goBack()
            console.log(response)
            alert('chat added')
        }) .catch(err => alert(err))

        // 
        // navigation.navigate("Home")
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Chat",
            title:"Add a new Chat",
        })
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
            <Input
            placeholder="Add a chat name"
            type="text"
            value={text}
            onChangeText={text => setText(text)}
            />
            <Button title="Create new Chat" containerStyle={styles.button} onPress={createChat} />
        </View>
        </KeyboardAvoidingView>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 30,
        height:"100%"
    },
    inputContainer:{},
    button: {}
})