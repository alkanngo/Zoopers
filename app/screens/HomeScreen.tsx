import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";
import {Colors} from "../styles";
import { Button, Container, Content } from "native-base";
import firebase from "firebase";
import HoopButton from "./../components/HoopButton";

function HomeScreen (props) {

  const logoutUser = () => {
    firebase.auth().signOut();
    props.navigation.navigate("Login")
  }

  const navigateToMaps = () => {
    props.navigation.navigate("Map")
  }

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        <View style={styles.slider}>
          <Slider />
        </View>
        <HoopButton 
          value="Locate"
          onPress={navigateToMaps}
        />
        <Button danger onPress={logoutUser}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.name.primary,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: "100%",
    height: 200,
    alignContent: "center",
  },
  slider: {
    backgroundColor: Colors.name.secondary
  },
  button: {

  }

});

export default HomeScreen;