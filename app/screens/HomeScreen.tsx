import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import {Colors} from '../styles';
import { Button } from 'native-base';


function HomeScreen ({navigation}) {

    const pressHandler = () => {
        navigation.navigate("Map")
    }

    return (
        <View>
            <Text>HEMMASKÄRM</Text>
            <Button onPress={pressHandler}>
                <Text>Maps</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: Colors.name.secondary,
    },

});

export default HomeScreen;