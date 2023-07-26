import React from 'react';
import {StyleSheet, ScrollView, Text, View, Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 250,
      height: 250,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#1E2923",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

const Home = (props) => {
  console.log(props.route.params.rings);
  console.log(props.route.params.user);
  console.log(props.route.params.cardList);
  const [user,setUser] = React.useState("")
  const [getNotes, setGetNotes] = React.useState(true)
  const getUser = () => {
    Auth.currentUserInfo()
    .then(user => {
      setUser(user.username)
      props.route.params.user = user;
    })
    .catch(err => console.log(err))
  }

  getUser()

  if(user !== "") {
    const Http = new XMLHttpRequest();
    const url = `AWS_API_GATEWAY/default/GetAllNotesForUsername?username=${user}`;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=function(){
      if(Http.readyState==4 && Http.status==200) {
        const nL = JSON.parse(Http.responseText)
        props.route.params.cardList = nL['noteList']
        console.log("OK 2")
        setGetNotes(false)
      }
      else {
        console.log('error');
      }
    }
  }

  const [rings, setRings] = React.useState({
    labels: ["Food", "Water", "Exercise"],
    data: props.route.params.rings,
    colors: [`rgba(76, 187, 23, 1)`,`rgba(0, 150, 255, 1)`,`rgba(255, 165, 0, 1)`]
  });
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  if(getNotes)
  {
    return (
      <Text>Loading...</Text>
    )
  }
  else
  {
    return (
      <View>
        <ProgressChart
          data={rings}
          width={width}
          height={Math.floor(height*0.4)}
          strokeWidth={24}
          radius={30}
          chartConfig={chartConfig}
          hideLegend={true}
          withCustomBarColorFromData={true}
        />

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex:1}}
            onPress={()=>{
                //Navigate
                console.log(props)
                props.navigation.navigate("UpdateNutrition", {navigation: props.navigation, rings: rings, goals: props.route.params.goals})
            }}>
            <Svg width={Math.floor(width*0.33)} height={Math.floor(height*0.1)}>
              <Circle
                //GREEN
                fill="rgba(76, 187, 23, 1)"
                cx="50%"
                cy="35%"
                r="15"
              />
              <SVGText 
                x='50%'
                y='70%'
                fontSize="15"
                stroke="black"
                textAnchor='middle'>
                Nutrition
              </SVGText>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex:1}}
            onPress={()=>{
                //Navigate
                console.log(props)
                props.navigation.navigate("UpdateWater", {navigation: props.navigation, rings: rings, goals: props.route.params.goals})
            }}>
              <Svg width={Math.floor(width*0.33)} height={Math.floor(height*0.1)}>
                <Circle
                  //BLUE
                  fill="rgba(0, 150, 255, 1)"
                  cx="50%"
                  cy="35%"
                  r="15"
                />
                <SVGText 
                  x='50%'
                  y='70%'
                  fontSize="15"
                  stroke="black"
                  textAnchor='middle'>
                  Water
                </SVGText>
              </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
                //Navigate
                console.log(props)
                props.navigation.navigate("UpdateExercise", {navigation: props.navigation, rings: rings, goals: props.route.params.goals})
            }}>
            <Svg width={Math.floor(width*0.33)} height={Math.floor(height*0.1)}>
              <Circle
                //Orange
                fill="rgba(255, 165, 0, 1)"
                cx="50%"
                cy="35%"
                r="15"
              />
              <SVGText 
                x='50%'
                y='70%'
                fontSize="15"
                stroke="black"
                textAnchor='middle'>
                Exercise
              </SVGText>
            </Svg>
          </TouchableOpacity>

        </View>
        
        <View
        style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop:'10%'
        }}>
          <Button 
              title='Journal'
              onPress={() => 
                props.navigation.navigate('NotesYear', {username: props.route.params.user, cardList: props.route.params.cardList})
              } 
          />
        </View>

      </View>
    );
  }
  
};

export default Home;