import * as React from 'react';
import { Button, View, Text } from 'react-native';


const NotesYearHeader = ({ navigation }) => {
    //TODO: Load Saved Notes from DB and Create Clickable Labels that Show the year. When you click on a label it brings you into 
    //a notes preview that shows a preview of each note written that year, with a seperator For each month. The Notes preview themselves 
    //have the number of the day of the month next to them as well as the abbreviation for the day of the week
  return (
    <View>
        <Text style={{color: 'white', padding: 5, fontSize: 22}}>Notes</Text>
    </View>
  );
};

export default NotesYearHeader;