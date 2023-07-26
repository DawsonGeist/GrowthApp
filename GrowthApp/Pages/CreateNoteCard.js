import React, { Fragment } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Button, Text, TextInput, DeviceEventEmitter } from 'react-native';
import uuid from 'react-native-uuid'
import { Auth } from 'aws-amplify'

let targetDay = ""
let targetYear = ""

const GetDateFromDateTimeString = (dateTimeString) => {
  // "YYYY-MM-DD HH:MM:SS" 
  dateTimeArray = dateTimeString.split(" ")
  return dateTimeArray[0]
}

const GetYearFromDateTimeString = (dateTimeString) => {
  // "YYYY-MM-DD HH:MM:SS" 
  dateArray = GetDateFromDateTimeString(dateTimeString).split("-")
  return dateArray[0]
}

const CreateNoteCard = (props) => {
    console.log(`Create NoteCard: Current User ${props.route.params.username}`)
    console.log(`Create NoteCard: route.params.cardList has ${props.route.params.cardList.length} elements!`)

    const [title, setTitle] = React.useState((props.route.params.edit ? "Save" : "Edit"));
    const [enableEdit, setEnableEdit] = React.useState(props.route.params.edit);
    const [mood, setMood] = React.useState((props.route.params.mood ==='' ? "Not Sure": props.route.params.mood));
    const [body, setBody] = React.useState(props.route.params.body);

    if(props.route.params.date_time_created === "") {
        console.log(`Create NoteCard: FORMATTING DATE`)
        let date = new Date()
        let year=date.getFullYear()
        year=`${year}`
        let month=date.getMonth()
        if (month < 10) {
            month = `0${month}`
        }
        let day=date.getDate()
        if (day < 10) {
            day = `0${day}`
        }
        let hours= date.getHours()
        let mins= date.getMinutes()
        if (mins < 10) {
            mins = `0${mins}`
        }
        let secs = date.getSeconds()
        if (secs < 10) {
            secs = `0${secs}`
        }
        props.route.params.date_time_created = `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
        targetDay = `${year}-${month}-${day}`
        targetYear = year
        console.log(`Create NoteCard: NEW TARGET DAY AND YEAR ${targetDay} ... ${targetYear}`)
        console.log(`Create NoteCard: WE FORMATTED DATE`)
    }
    else {
        targetDay = GetDateFromDateTimeString(props.route.params.date_time_created)
        targetYear = GetYearFromDateTimeString(props.route.params.date_time_created)
        console.log(`Create NoteCard: CURRENT TARGET DAY AND YEAR ${targetDay} ... ${targetYear}`)
    }
    if(props.route.params.noteID === "" ) {
        props.route.params.noteID = uuid.v4();
    }
    
    return (
        <Fragment>
            <SafeAreaView style={{flex:0, backgroundColor:"silver"}}> 
            </SafeAreaView>
            <SafeAreaView style={{flex:1, backgroundColor:"silver"}}>
                <View style={{backgroundColor : "silver", flex: 0, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding:"2%"}}>
                    <Button
                        title="Back"
                        onPress={() => {
                            props.navigation.navigate('Notes', {username: props.route.params.username, cardList: props.route.params.cardList, targetDay: targetDay, targetYear: targetYear})
                        }}
                    />
                    <Text style={{backgroundColor:"white", alignSelf:"center", backgroundColor: "silver"}}>{props.route.params.date_time_created}</Text>
                    <Button
                        title={title} 
                        onPress={() => {
                            if (title === 'Save') {
                                setTitle("Edit")
                                // Make it so the text input is view only
                                setEnableEdit(false)
                                //Send the updated/New card data somewhere
                                //Choose one of 2:
                                //props.updateCards(props.noteID,props.body,props.mood)
                                /*console.log("CreateNoteCard: Sending NoteCreation Event!")
                                DeviceEventEmitter.emit("event.NoteCreation", ({
                                    "noteID": props.route.params.noteID,
                                    "username": props.route.params.username,
                                    "date_time_created": props.route.params.date_time_created,
                                    "body": props.route.params.body,
                                    "mood": mood
                                }));*/
                                console.log("\n\n\n PROP LOGIC:")
                                if (props.route.params.cardList.length > 0){
                                    console.log("card list has elements present:")
                                    let addCard = true;
                                    for(var i = 0; i < props.route.params.cardList.length; i++) {
                                        console.log("In For Loop")
                                        if(props.route.params.cardList[i].noteID === props.route.params.noteID){
                                            console.log("SAME NOTE ID")
                                            props.route.params.cardList[i] = 
                                            {
                                                'noteID': props.route.params.noteID, 
                                                'username': props.route.params.username, 
                                                'date_time_created': props.route.params.date_time_created, 
                                                'body': props.route.params.body, 
                                                'mood': props.route.params.mood
                                            }
                                            addCard = false;
                                            console.log("making API call")
                                            const Http = new XMLHttpRequest();
                                            const url = `AWS_API_GATEWAY/default/UpdateNoteForUsername?username=${props.route.params.username}`;
                                            const requestBody = JSON.stringify({ 
                                                "noteID": props.route.params.noteID, 
                                                "username": props.route.params.username, 
                                                "date_time_created": props.route.params.date_time_created, 
                                                "body": props.route.params.body, 
                                                "mood": props.route.params.mood
                                            })
                                            Http.open("POST", url);
                                            Http.send(requestBody);
                                            Http.onreadystatechange=function(){
                                                if(Http.readyState==4 && Http.status==200) {
                                                    console.log("Success")
                                                }
                                                else {
                                                    console.log(Http.responseText);
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    if (addCard) {
                                        props.route.params.cardList = [
                                            ...props.route.params.cardList,
                                            {
                                                'noteID': props.route.params.noteID, 
                                                'username': props.route.params.username, 
                                                'date_time_created': props.route.params.date_time_created, 
                                                'body': props.route.params.body, 
                                                'mood': props.route.params.mood
                                            }
                                        ];
                                        console.log(props.route.params.cardList.length)
                                        //Make API call
                                        //Here we are going to hit the aws lambda function so that we can fill the entire history of our notes list
                                        //READ THIS: https://repost.aws/knowledge-center/api-gateway-lambda-http-endpoint
                                        //READ THIS: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
                                        console.log("making API call")
                                        
                                        const Http = new XMLHttpRequest();
                                        const url = `AWS_API_GATEWAY/default/publishNoteForUsername?username=${props.route.params.username}`;
                                        const requestBody = JSON.stringify({ 
                                            "noteID": props.route.params.noteID, 
                                            "username": props.route.params.username, 
                                            "date_time_created": props.route.params.date_time_created, 
                                            "body": props.route.params.body, 
                                            "mood": props.route.params.mood
                                        })
                                        Http.open("POST", url);
                                        Http.send(requestBody);
                                        Http.onreadystatechange=function(){
                                            if(Http.readyState==4 && Http.status==200) {
                                                console.log("Success")
                                            }
                                            else {
                                                console.log(Http.responseText);
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("card list has no elements present:")
                                    props.route.params.cardList = [                                  
                                        { 
                                            "noteID": props.route.params.noteID, 
                                            "username": props.route.params.username, 
                                            "date_time_created": props.route.params.date_time_created, 
                                            "body": props.route.params.body, 
                                            "mood": props.route.params.mood
                                        }
                                    ];
                                    console.log("making API call")
                                        
                                        const Http = new XMLHttpRequest();
                                        const url = `AWS_API_GATEWAY/default/publishNoteForUsername?username=${props.route.params.username}`;
                                        const requestBody = JSON.stringify({ 
                                            "noteID": props.route.params.noteID, 
                                            "username": props.route.params.username, 
                                            "date_time_created": props.route.params.date_time_created, 
                                            "body": props.route.params.body, 
                                            "mood": props.route.params.mood
                                        })
                                        Http.open("POST", url);
                                        Http.send(requestBody);
                                        Http.onreadystatechange=function(){
                                            if(Http.readyState==4 && Http.status==200) {
                                                console.log("Success")
                                            }
                                            else {
                                                console.log(Http.responseText);
                                            }
                                        }
                                }
                            }
                            else {
                                setTitle("Save")
                                // Make it so the text input is view only
                                setEnableEdit(true)
                                //Send the updated/New card data somewhere
                                //Choose one of 2:
                                //props.updateCards(props.noteID,props.body,props.mood)
                                //DeviceEventEmitter.emit("event.NoteCreation", (value.value));

                            }
                    }}/>
                </View>
                <View>
                </View>
                <ScrollView style={{backgroundColor:"white", paddingLeft:"7%", paddingRight:"7%", flex:1}} keyboardShouldPersistTaps='always'> 
                    <TextInput
                        style={{backgroundColor:"white"}}
                        ref={(input) => { this.secondTextInput = input; }}
                        editable={enableEdit}
                        multiline
                        autoFocus
                        value={body}
                        placeholder={(enableEdit ? 'Enter Text Here' : '')}
                        onChangeText={(text) => {
                            props.route.params.body = text
                            setBody(text)
                            }}
                    />
                    <View style={{padding:"5%"}}>
                        <Button
                                title={(mood === 'Not Sure' ? "How do you feel?" : `Feeling: ${mood}`)}
                                disabled={!enableEdit}
                                onPress={() => {
                                    DeviceEventEmitter.addListener("event.MoodSelection", (mood) => {
                                        props.route.params.mood = mood
                                        setMood(mood)
                                    });
                                    props.navigation.navigate('MoodCreation')
                                }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView> 
        </Fragment>
        
    );
}

export default CreateNoteCard