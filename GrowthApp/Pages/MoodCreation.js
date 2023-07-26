import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Button, Text, DeviceEventEmitter, Image, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NoteCard from '../Components/NoteCard';
import uuid from 'react-native-uuid'
import { Auth } from 'aws-amplify'

const primaryEmotions = [
    {label: 'Happy', value: 'happy'},
    {label: 'Surprised', value: 'surprised'},
    {label: 'Bad', value: 'bad'},
    {label: 'Fearful', value: 'fearful'},
    {label: 'Angry', value: 'angry'},
    {label: 'Disgusted', value: 'disgusted'},
    {label: 'Sad', value: 'sad'},
]

const images = [
    {
        source: require('../assets/emotion_wheel.png'),
        title: 'Wheel of Emotion',
        width: 1024,
        height: 1021
    }
]

const MoodCreation = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState(primaryEmotions);
    const [viewImage, setViewImage] = React.useState(false);

    return (
        <View>
            <TouchableOpacity style={{height:"50%" ,justifyContent:"center", backgroundColor:"white"}} onPress={() => setViewImage(true)}>
                <Image
                    source={require('../assets/emotion_wheel.png')}
                    style={styles.wheel}
                />
            </TouchableOpacity>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                disabled={false}
                disabledStyle={{opacity: 0.5}}
                onSelectItem={(value) => {
                    console.log("EMITTING EMOTION")
                    console.log(value.value)
                    DeviceEventEmitter.emit("event.MoodSelection", (value.label));
                    //DeviceEventEmitter.removeAllListeners("event.MoodSelection");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wheel: {  
        alignSelf: "center",  
        width: "70%",
        height: "70%",
        resizeMode:'contain'
    },
  });

export default MoodCreation