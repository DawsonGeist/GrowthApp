import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

let lastDateSeen = "NULL"
let currentMonth = "NULL"
const monthString = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

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

const GetDayFromDateTimeString = (dateTimeString) => {
  // "YYYY-MM-DD" 
  dateArray = GetDateFromDateTimeString(dateTimeString).split("-")
  return dateArray[2]
}

const DayOfNotesButton = (card, targetYear, navigation, route) => {
  let sourceDateTime = card['date_time_created']
  let sourceDate = GetDateFromDateTimeString(sourceDateTime)
  let sourceYear = GetYearFromDateTimeString(sourceDateTime)
  let sourceMonth = GetMonthFromDateTimeString(sourceDateTime)
  let sourceDay = GetDayFromDateTimeString(sourceDateTime)
  console.log(`Last Seen:${lastDateSeen} - Source Date:${sourceDate} - Target Year:${targetYear} - Source Year:${sourceYear}`)
  if(sourceYear === targetYear && lastDateSeen !== sourceDate) {
    lastDateSeen = sourceDate
    let cardTitle1 = card['body'].substring(0,15)
    let cardTitle2 = `${sourceDay} - ${cardTitle1}`
    if(sourceMonth !== currentMonth) {
      currentMonth = sourceMonth
      return <View>
              <Text>{monthString[sourceMonth]}</Text>
              <Button title={cardTitle2} 
                onPress={() => {
                //Add a blank card to the existing cardList
                //CreateCard(navigation)
                //Update the App State with the new card list
                //setCards(cardList)
                lastDateSeen = "NULL"
                currentMonth = "NULL"
                navigation.navigate("Notes", {username: route.params.username, cardList: route.params.cardList, targetDay: sourceDate, targetYear: targetYear})
                }}/>
             </View>
    }
    else {
      return <Button title={cardTitle2}
                    onPress={() => {
                              //Add a blank card to the existing cardList
                              //CreateCard(navigation)
                              //Update the App State with the new card list
                              //setCards(cardList)
                              lastDateSeen = "NULL"
                              currentMonth = "NULL"
                              navigation.navigate("Notes", {username: route.params.username, cardList: route.params.cardList, targetDay: sourceDate, targetYear: targetYear})
                            }}
              />
    }
  }
}

const NotesPreview = ({navigation, route}) => {
    console.log(`Notes Preview: Current User ${route.params.username}`)
    console.log(`Notes Preview: Card List ${route.params.cardList}`)
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
                lastDateSeen = "NULL"
                currentMonth = "NULL"
                navigation.navigate("NotesYear", {username: route.params.username, cardList: route.params.cardList})
                }}/>
          ),
          headerRight: () => (
            <Button
              title='Create Note'
              onPress={() => {
                lastDateSeen = "NULL"
                currentMonth = "NULL"
                navigation.navigate("CreateNoteCard", {navigation: navigation, noteID: "", username: route.params.username, date_time_created: "", body: "", mood: "", cardList: route.params.cardList, edit:true})}
              }
            />)
        });
      }, [navigation]);
      
    return (
        <ScrollView>
            {route.params.cardList.map(card => DayOfNotesButton(card, route.params.targetYear, navigation, route))}
        </ScrollView>
    );
}

export default NotesPreview;