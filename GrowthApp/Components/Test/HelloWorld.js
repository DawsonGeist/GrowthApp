import React from 'react';
import {ScrollView, Text, View, Button} from 'react-native';

const HelloWorld = ({navigation}) => {
  
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          title="Right Button" 
          onPress={() => 
            navigation.navigate('TestPage')
          } 
        />
      ),
    });
  })

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Try editing me! 🎉</Text>
      </View>
    </ScrollView>
  );
};

export default HelloWorld;