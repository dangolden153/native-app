import React from 'react'
import { View, Text } from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import pics from '../pictures/pics2.jpg'


const ListItems = ({id, enterChat, chatName}) => {
    return (
        <ListItem onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar 
            rounded
            source={{uri: pics}}
            />

            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                    {chatName}
                   
                    </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                this is a test subtitlethis is a test subtitlethis is a test subtitlethis is a test subtitle
                    </ListItem.Subtitle>

            </ListItem.Content>
        </ListItem>
        
    )
}

export default ListItems
