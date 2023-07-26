import React from 'react';
import { AppState, Button, ScrollView, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import HomeHeader from './Components/Headers/HomeHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TestPage from './Pages/TestPage';
import Home from './Pages/Home';
import CreateNote from './Pages/Notes'
import Profile from './Pages/Profile';
import ProfileHeader from './Components/Headers/ProfileHeader';
import NotesYear from './Pages/NotesYear';
import NotesYearHeader from './Components/Headers/NotesYearHeader';
import NotesPreview from './Pages/NotesPreview';
import Notes from './Pages/Notes';
import MoodCreation from './Pages/MoodCreation';
import CreateNoteCard from './Pages/CreateNoteCard';
import UpdateNutrition from './Pages/UpdateNutrition';
import UpdateWater from './Pages/UpdateWater';
import UpdateExercise from './Pages/UpdateExercise';
import { Amplify } from 'aws-amplify';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

const Stack = createNativeStackNavigator();
function App() {
  const [user, setUser] = React.useState("")
  const [createCardListenerActive, setCreateCardListenerActive] = React.useState(false) 

  Hub.listen('auth', (data) => {
    console.log(data)
    if (data.payload.event === "signIn") {
      setUser(data.payload.data.username)
    }
    else if (data.payload.event === "signOut") {
      setUser("")
    }
  })

  React.useEffect(() => {
    if(AppState.currentState == 'active' && user ==='') {
      tryGrabUsername()
    }
  }, [])

  const tryGrabUsername = () => {
    Auth.currentUserInfo()
      .then(user => setUser(user.username))
      .catch(err => console.log(err))

    console.log(`reloaded user: ${user}`)
  }
  
  
  console.log(`Current User: ${user}`)
  //"Data such as user objects should be in your global store"
  //https://reactnavigation.org/docs/params/

  if(!createCardListenerActive) {
    DeviceEventEmitter.addListener("event.NoteCreation", (card) => {
      console.log("App.js: Note Creation Event Heard!")
      console.log(card)
    });
    setCreateCardListenerActive(true)
  }
  

  return (
    <Authenticator.Provider>
      <Authenticator loginMechanisms={['email']}>
        <NavigationContainer >
          <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={({navigation}) => ({
                  headerStyle: {
                    backgroundColor: 'darkblue',
                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                })}>

                <Stack.Screen
                  name="Home"
                  component={Home}
                  //Correct way to initialize stack screen route initial parameters
                  initialParams={{rings: [0.0,0.0,0.0], goals: [2000, 2000, 60], user: user, cardList: []}}
                  options={({navigation}) => ({
                    headerLeft: () => (
                      <Text></Text>
                    ), 
                    headerTitle: () => <HomeHeader/>,
                    headerRight: () => (
                      //Change this to image/icon
                      <Button 
                        title="Profile" 
                        onPress={() =>
                          //Change this to profile set up
                          navigation.navigate('Profile')
                        }
                        />
                    )
                    })}
                />
                
                <Stack.Screen
                  name="TestPage"
                  component={TestPage}
                  options={({navigation}) => ({
                    headerRight: () => (
                    <Button 
                      title="+" 
                  />)
                    })}
                />

                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={({navigation}) => ({
                    headerTitle: () => <ProfileHeader/>
                    })}
                />

                <Stack.Screen
                  name="NotesYear"
                  component={NotesYear}
                  options={({navigation}) => ({
                    headerTitle: () => <NotesYearHeader/>,
                    headerRight: () => (
                      <Button
                        title='Create Note'
                        onPress={() => navigation.navigate("CreateNoteCard", {navigation: navigation, noteID: "", username: user, date_time_created: "", body: "", mood: "", cardlist:[],edit:true})}
                      />)
                    })}
                />

                <Stack.Screen
                  name="NotesPreview"
                  component={NotesPreview}
                  options={({navigation}) => ({
                    headerTitle: () => <NotesYearHeader/>,
                    headerRight: () => (
                      <Button
                        title='Create Note'
                        onPress={() => navigation.navigate("CreateNoteCard", {navigation: navigation, noteID: "", username: user, date_time_created: "", body: "", mood: "",cardlist:[],edit:true})}
                      />
                    )
                    })}
                />

                <Stack.Screen
                  name="Notes"
                  component={Notes}
                  options={({navigation}) => ({
                    headerRight: () => (
                    <Button 
                      title="+"/>
                    )
                    })}
                />

                <Stack.Screen
                  name="MoodCreation"
                  component={MoodCreation}
                  options={({navigation}) => ({
                    headerRight: () => (
                    <Button 
                      title="+"/>
                    )
                    })}
                />

              <Stack.Screen
                name="CreateNoteCard"
                component={CreateNoteCard}
                options={({navigation}) => ({
                  props: {navigation: navigation, noteID: "", username: user, date_time_created: "", body: "", mood: "",cardlist:[],edit:true},
                  headerShown:false
                  })}
              />

              <Stack.Screen
                name="UpdateNutrition"
                component={UpdateNutrition}
                options={({navigation}) => ({
                    props: {navigation: navigation, data: [0,0,0]},
                    headerLeft: () => (
                    <Button 
                      title="<"/>
                    )
                    })}
              />

              <Stack.Screen
                name="UpdateWater"
                component={UpdateWater}
                options={({navigation}) => ({
                    props: {navigation: navigation, data: [0,0,0]},
                    headerLeft: () => (
                    <Button 
                      title="<"/>
                    )
                    })}
              />

              <Stack.Screen
                name="UpdateExercise"
                component={UpdateExercise}
                options={({navigation}) => ({
                    props: {navigation: navigation, data: [0,0,0]},
                    headerLeft: () => (
                    <Button 
                      title="<"/>
                    )
                    })}
              />

            </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;

/*
export default withAuthenticator(App, { 
  signUpConfig,
  usernameAttributes: 'Phone Number' });
*/

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
      {
        label: 'Phone Number',
        key: 'phone',
        required: true,
        displayOrder: 1,
        type: 'string'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      },
    // and other custom attributes
    ]
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
