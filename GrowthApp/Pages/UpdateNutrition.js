import React from 'react';
import { TextInput, Text, View, Button, Dimensions } from 'react-native';
import ProgressBar from 'react-native-progress-bar-horizontal';
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";


const UpdateNutrition = (props) => {
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
    const [nutritionLevel,setNutritionLevel] = React.useState(props.route.params.rings["data"][0])
    const [number, onChangeNumber] = React.useState('');
    const goal = props.route.params.goals[0]
    const goalStatement = `Your Goal for Daily Nutrition is: ${goal} Calories!`

    let x = 0;

    console.log(`Nutrition Level: ${nutritionLevel}`);
    console.log(`Number : ${number}`);
    console.log(`X : ${x}`);

    return (
        <View>
        <Svg width={Math.floor(width)} height={Math.floor(height*0.1)}>
           <SVGText 
                x='50%'
                y='55%'
                fontSize="15"
                stroke="black"
                textAnchor='middle'>
            NUTRITION
          </SVGText>
        </Svg>
          <ProgressBar
            progress={nutritionLevel}
            borderWidth={1}
            fillColor="rgba(76, 187, 23, 1)"
            unfilledColor="rgba(239, 252, 232, 1)"
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
              placeholder="number of calories"
              keyboardType="numeric"
            />
            <Button 
              title='Submit'
              style={{flex:1}}
              //
              onPress={() => {
                newLevel = (number === "" ? 0 : (nutritionLevel + parseFloat(number)/2000))
                setNutritionLevel(newLevel)
                props.route.params.rings["data"][0] = newLevel 
                onChangeNumber('')
                //API CALL TO UPDATE DATABASE 
              }}
                />
          </View>
        </View>
    );
}

export default UpdateNutrition;