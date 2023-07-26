import React from 'react';
import { Text, View, Button } from 'react-native';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);


async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

const Profile = () => {
    return (
        <View>
            <Text>Edit Profile Page</Text>
            <Button 
                title="Sign Out"
                onPress={signOut}
                />
        </View>
    );
}

export default Profile;