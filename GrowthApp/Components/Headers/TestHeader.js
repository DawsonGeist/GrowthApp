import * as React from 'react';
import { Button, View, Text } from 'react-native';

const TestHeader = ({ navigation }) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
        <Text style={{color: 'white', padding: 5, fontSize: 22}}>App Title</Text>
    </View>
  );
};

export default TestHeader;