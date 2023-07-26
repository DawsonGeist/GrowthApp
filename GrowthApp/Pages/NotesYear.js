import React from 'react';
import { Text, ScrollView, Button } from 'react-native';

let currentYear = ""

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

const GetMonthFromDateTimeString = (dateTimeString) => {
  // "YYYY-MM-DD" 
  dateArray = GetDateFromDateTimeString(dateTimeString).split("-")
  return dateArray[1]
}

const YearOfNotesButton = (card, navigation, route) => {
  console.log(currentYear)
  let sourceDateTime = card['date_time_created']
  let sourceYear = GetYearFromDateTimeString(sourceDateTime)
  if(sourceYear !== currentYear ) {
    currentYear = sourceYear
      return <Button title={sourceYear} 
                onPress={() => {
                //Add a blank card to the existing cardList
                //CreateCard(navigation)
                //Update the App State with the new card list
                //setCards(cardList)
                currentYear = ""
                navigation.navigate("NotesPreview", {username: route.params.username, cardList: route.params.cardList, targetYear: sourceYear})
                }}/>
  }
}

const NotesYear = ({navigation, route}) => {
    console.log(`Notes Year: Current User ${route.params.username}`)
    console.log(`Notes Year: Card List ${route.params.cardList}`)
    const [getNotes, setGetNotes] = React.useState(true)

    //Here we are going to hit the aws lambda function so that we can fill the entire history of our notes list
    //READ THIS: https://repost.aws/knowledge-center/api-gateway-lambda-http-endpoint
    //READ THIS: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
    // API CALL IS SAVED IN POSTMAN
    //AWS_API_GATEWAY/default/GetAllNotesForUsername?username=test
    

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
                navigation.navigate("Home")
                }}/>
          ),
          headerRight: () => (
            <Button
              title='Create Note'
              onPress={() => {
                currentYear = ""
                navigation.navigate("CreateNoteCard", {navigation: navigation, noteID: "", username: route.params.username, date_time_created: "", body: "", mood: "", targetDay: "", targetYear: "", cardList: route.params.cardList, edit:true})}
              }
            />)
        })
      }, [navigation]);
    
    return (  
        <ScrollView>
            {
              route.params.cardList.map(card => YearOfNotesButton(card, navigation, route))
            }
        </ScrollView>
    );
} 

export default NotesYear;