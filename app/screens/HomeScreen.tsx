import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, View, Text, Slider, ImageBackground } from "react-native";
import { Content } from "native-base";
import { Colors, Spacing, Typography } from "./../styles";
import { UserContext } from "./../context/UserContext"

import HoopButton from "./../components/HoopButton";
import HoopSlider from "./../components/HoopSlider";


import firebase from "firebase";

function HomeScreen (props) {

  useEffect(() => {
  },);
  const logoutUser = () => {
    firebase.auth().signOut();
    props.navigation.navigate("Login")
  }

  const navigateToMaps = () => {
    props.navigation.navigate("Map")
  }

  return (
      <Content contentContainerStyle={styles.content}>
        <ImageBackground
          source={require("./../../assets/home.png")} 
          style={styles.content} 
          resizeMode="cover"
        >
          <HoopSlider />
          <HoopButton 
            value="Locate"
            onPress={navigateToMaps}
          />
          <View style={{ marginBottom: Spacing.margin.lg}}/>
          <HoopButton
            value="Logout"
            onPress={logoutUser}
            danger
          />
        </ImageBackground>
      </Content>
  )
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.name.background
  }
});

export default HomeScreen;
