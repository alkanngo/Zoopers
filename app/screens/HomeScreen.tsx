import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {Colors} from "../styles";
import { Button } from "native-base";
import firebase from "firebase";


function HomeScreen (props) {

    const logoutUser = () => {
        firebase.auth().signOut();
        props.navigation.navigate("Login");
    }

    const navigateToMaps = () => {
        props.navigation.navigate("Map")
    }

    return (
        <View>
            <Text>HEMMASKÄRM</Text>
            <Button onPress={navigateToMaps}>
                <Text>Maps</Text>
            </Button>
            <Button danger onPress={logoutUser}>
                <Text>Logout</Text>
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