import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

Amplify.configure(awsconfig);
/*
function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function SignUp() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default SignUp;
*/

//https://docs.amplify.aws/lib/auth/emailpassword/q/platform/react-native/#sign-up
Amplify.configure(awsconfig);
let userInfo = {
    "phone": "",
    "email": "",
    "password": "",
    "c_password": "",
};

//This function works. TODO: Create sign in sign up page.
async function signUp(phone, email, password, c_password) {
    if(password === c_password) {
        try {
            const { user } = await Auth.signUp({
            username: `+${phone}`,
            password: password,
            attributes:{
                email: email
            },
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    else {
        console.log("passwords don't match");
    }
  
}

const SignUp = ({navigation}) => {
    [phone, onChangePhone] = React.useState("");
    [email, onChangeEmail] = React.useState("");
    [password, onChangePassword] = React.useState("");
    [c_password, onChangeCPassword] = React.useState("");

    function listenToAutoSignInEvent() {
        console.log("\n\nENTERED AUTOSIGN EVENT\n\n");
        Hub.listen('auth', ({ payload }) => {
            const { event } = payload;
            if (event === 'autoSignIn') {
            const user = payload.data;
            // assign user
            } else if (event === 'autoSignIn_failure') {
            // redirect to sign in page
            navigation.navigate("Home");
            }
        })
    }

    return (
        <View
        style={{
        flex: 1,
        alignItems: 'center',
        }}>
        <Image
            style={styles.tinyLogo}
            source={require('../assets/blockikarp.gif')}
        />
        <Text>
            Phone Number:
        </Text>
        <TextInput 
            placeholder='Enter Phone Here'
            editable
            onChangeText={onChangePhone}
            inputMode="numeric"
        />
        <Text>
            Confirmation Email:
        </Text>
        <TextInput 
            placeholder='joe.swanson@gmail.com'
            editable
            onChangeText={onChangeEmail}
        />
        <Text>
            Password:
        </Text>
        <TextInput 
            placeholder='Enter password'
            editable
            onChangeText={onChangePassword}
        />
        <Text>
            Confirm Password:
        </Text>
        <TextInput 
            placeholder='Confirm password'
            editable
            onChangeText={onChangeCPassword}
        />
        <Button 
            title='Submit!' 
            onPress={() => 
            //Change this navigation to Notes Yearly Overview
                signUp(phone, email, password, c_password)
            } 
        />
        </View>
  );
};

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

export default SignUp;