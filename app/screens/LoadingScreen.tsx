import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Container, Spinner} from "native-base";
import firebase from "firebase";

function LoadingScreen(props) {

  useEffect(() => {
    checkIfLoggedIn();
  });

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        props.navigation.navigate("Home")
      }
      else {
        props.navigation.navigate("Login")
      }
    })
  }

  return(
    <Container>
      <ImageBackground 
        source={require("./../../assets/Loading.jpg")} 
        style={styles.background} 
        resizeMode="cover"
      >
        <Spinner color="black"/>
      </ImageBackground>
    </Container>
  )
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default LoadingScreen;
