import React, { useState } from "react";
import { StyleSheet, View, Text, Slider } from "react-native";
import { Content } from "native-base";
import { Colors, Spacing, Typography } from "./../styles";
import firebase from "firebase";
import HoopButton from "./../components/HoopButton";

function HomeScreen (props) {

  const [slideValue, setSlideValue] = useState();

  const logoutUser = () => {
    firebase.auth().signOut();
    props.navigation.navigate("Login")
  }

  const navigateToMaps = () => {
    props.navigation.navigate("Map")
  }

  return (
      <Content contentContainerStyle={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.text}>Choose radius in which to find Hoops</Text>
          <Text style={styles.km} >{Math.floor(slideValue)} Km</Text>
        </View>
        <View style={styles.slider}>
          <Slider 
            thumbTintColor={Colors.name.secondary}
            minimumTrackTintColor={Colors.name.secondary}
            minimumValue={0}
            maximumValue={100}
            value={40}
            onValueChange={(value) => setSlideValue(value)}
          />
        </View>
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
      </Content>
  )
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center"
  },
  textGroup: {
    bottom: 50,
    alignItems: "center"
  },
  text: {
    fontSize: Typography.size.lg,
    textAlign: "center",
  },
  km: {
    marginTop: Spacing.margin.lg
  },
  slider: {
    marginBottom: Spacing.margin.lg
  },
});

export default HomeScreen;
