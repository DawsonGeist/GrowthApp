import React from 'react';
import { TextInput, Text, View, Button, Dimensions } from 'react-native';
import ProgressBar from 'react-native-progress-bar-horizontal';
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";


const UpdateExcercise = (props) => {
    React.useEffect(() => {
        props.navigation.setOptions({
          headerLeft: () => (
            <Button 
            title='<'
            onPress={() => {
                //Add a blank card to the existing cardList
                //CreateCard(navigation)
                //Update the App State with the new card list
                //setCards(cardList)
                props.navigation.navigate("Home")
                }}/>
          )
        })
      }, [props.navigation]);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const [exerciseLevel,setExerciseLevel] = React.useState(props.route.params.rings["data"][2])
    const [number, onChangeNumber] = React.useState('');
    const goal = props.route.params.goals[2]
    const goalStatement = `Your Goal for Daily Exercise is: ${goal} Minutes!`

    return (
        <View>
        <Svg width={Math.floor(width)} height={Math.floor(height*0.1)}>
           <SVGText 
                x='50%'
                y='55%'
                fontSize="15"
                stroke="black"
                textAnchor='middle'>
            EXERCISE
          </SVGText>
        </Svg>
          <ProgressBar
            progress={exerciseLevel}
            borderWidth={1}
            fillColor="rgba(255, 165, 0, 1)"
            unfilledColor="rgba(255, 246, 229, 1)"
            height={Math.floor(height*0.05)}
            borderColor="#4C2C2E"
            duration={100}
            />
          <Text>
            {goalStatement}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{flex:2}}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="minutes of exercise"
              keyboardType="numeric"
            />
            <Button 
              title='Submit'
              style={{flex:1}}
              //
              onPress={() => {
                newLevel = (number === "" ? 0 : (exerciseLevel + parseFloat(number)/60))
                setExerciseLevel(newLevel)
                props.route.params.rings["data"][2] = newLevel 
                onChangeNumber('')
                //API CALL TO UPDATE DATABASE 
              }}
                />
          </View>
        </View>
    );
}

export default UpdateExcercise;