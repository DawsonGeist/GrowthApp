import React from 'react';
import {Button, ScrollView } from 'react-native';
import NoteCard from '../Components/NoteCard';

const TestPage = ({navigation}) => {
    const [body, setBody] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [dateTime, setDateTime] = React.useState([]);

    let cardNum = 0;

    const GetTime = () =>{
        const dateTime = [new Date().toDateString(), new Date().toLocaleTimeString()];
        console.log(dateTime);
        return dateTime
    }

    const addCard = () => {
        setDateTime(GetTime())
        console.log("DateTime State")
        console.log(dateTime)
        setCards([
            ...cards,
            {key: cardNum++, body: body, dateTime: dateTime}
        ]);
    }

    return (
        <ScrollView style={{backgroundColor: "beige"}}>
            {cards.map(card => (
                NoteCard(card)
            ))}
        </ScrollView>
    );
};

export default TestPage;