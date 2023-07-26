import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Button, Text, DeviceEventEmitter } from 'react-native';
import NoteCard from '../Components/NoteCard';
import uuid from 'react-native-uuid'
import { Auth } from 'aws-amplify'

let cardNum = 0
let cardList = []
let dateTime = []
let username = ""
let body = ""

const GetDateFromDateTimeString = (dateTimeString) => {
    // "YYYY-MM-DD HH:MM:SS" 
    dateTimeArray = dateTimeString.split(" ")
    return dateTimeArray[0]
}

const DisplayNotesForTargetDay = (card, targetDay, navigation, route) => {
    sourceDate = GetDateFromDateTimeString(card['date_time_created'])
    if (sourceDate === targetDay) {
        return <NoteCard
                    key={card.noteID}
                    noteID={card.noteID}
                    username={card.username}
                    date_time_created={card.date_time_created}
                    body={card.body}
                    mood={card.mood}
                    cardList={route.params.cardList}
                    navigation={navigation}
                />
    }
}

const Notes = ({navigation, route}) => {
    console.log(`Notes: Current CardList ${route.params.cardList}`)

    if(route.params.cardList.length > 0){
        console.log(`Notes: route.params.cardList has ${route.params.cardList.length} elements!`)

        for(var i = 0; i < route.params.cardList.length; i++) {
            console.log(route.params.cardList[i])
        }
        cardList = route.params.cardList
    }
         
    //Update the callback for the header right button so that onPress creates a blank NoteCard
    //Official Documentation: https://reactnavigation.org/docs/header-buttons/
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button 
                title='<'
                onPress={() => {
                    //Add a blank card to the existing cardList
                    //CreateCard(navigation)
                    //Update the App State with the new card list
                    //setCards(cardList)
                    navigation.navigate("NotesPreview", {username: route.params.username, cardList: cardList, targetYear: route.params.targetYear})
                }}/>
              ),
            headerRight: () => (
                <Button 
                title='+'
                onPress={() => {
                    //Add a blank card to the existing cardList
                    //CreateCard(navigation)
                    //Update the App State with the new card list
                    //setCards(cardList)
                    navigation.navigate("CreateNoteCard", {navigation: navigation, noteID: "", username: route.params.username, date_time_created: "", body: "", mood: "", cardList: cardList, edit:true})
                }}/>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{backgroundColor: "darkblue", flex:1}}>
            <ScrollView 
                style={{backgroundColor: "white", paddingLeft:"7%", paddingRight:"7%"}}
                keyboardShouldPersistTaps='always'>
                {route.params.cardList.map(card => DisplayNotesForTargetDay(card, route.params.targetDay, navigation, route))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Notes;