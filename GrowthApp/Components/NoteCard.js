import React, { useState } from 'react';
import {Button, ScrollView, Text, View, TextInput, StyleSheet, DeviceEventEmitter, TouchableOpacity} from 'react-native';

const formatDate = (date) => {
    //SQL saves datetime as YYYY-MM-DD HH:MM:SS
    const dateTime = date.split(" ")
    //Now we have YYYY-MM-DD and HH:MM:SS
    const timeSplit = dateTime[1].split(":")
    let dayNight = "AM"
    let hour = timeSplit[0]
    let minute = timeSplit[1]
    if(parseInt(timeSplit[0]) > 12) {
        dayNight = "PM"
    }
    else if(parseInt(timeSplit[0]) == 12) {
        dayNight = "PM"
        hour = ((parseInt(timeSplit[0])) - 12).toString()
    }
    else {
        // Do nothing
    }
    return `${hour}:${minute} ${dayNight}`
}

const NoteCard = (props) => {
    //let body = props.body
    //let title = 'Edit'
    const [title, setTitle] = React.useState('Save')
    const [enableEdit, setEnableEdit] = React.useState(true)
    const [mood, setMood] = React.useState("Not Set")

    const time = formatDate(props.date_time_created)

    return (
        <TouchableOpacity
            onPress={()=>{
                //Navigate
                props.navigation.navigate("CreateNoteCard", {navigation: props.navigation, noteID: props.noteID, username: props.username, date_time_created: props.date_time_created, body: props.body, mood: props.mood, cardList: props.cardList, edit: false})
            }}>
            <View key={this.key} style={{paddingBottom:10}}> 
                <View>
                    <TextInput 
                        style={{backgroundColor : "white"}}
                        ref={(input) => { this.secondTextInput = input; }}
                        autoFocus
                        placeholder='Enter Text Here'
                        value={props.body}
                        editable={false}
                        multiline
                        onChangeText={(text) => (props.body = text)}
                    />
                </View>
                <View style={{backgroundColor : "white", flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text>Feeling: {props.mood}</Text>
                    <Text>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default NoteCard