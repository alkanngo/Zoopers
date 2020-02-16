import React, {useContext} from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';
import {Button, Container} from "native-base";
import {BigLogo} from "../components/Logo";
import {Colors, Spacing, Typography} from '../styles';
import LoginForm from '../components/Form';
import { UserContext } from "./../context/UserContext"
import firebase from "firebase";

function LoginScreen(props) {

  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

  firebase.auth().onAuthStateChanged(user => {
    if(user && !isLoggedIn) {
      props.navigation.navigate("Loading")
    } 
    else if(user && isLoggedIn) {
      props.navigation.navigate("Home")
    }
  })

  return(
    <Container>
    <ImageBackground 
      source={require("./../../assets/bBall.png")} 
      style={{height: '100%'}} 
      resizeMode="cover"
    >
      <BigLogo/>
      <LoginForm />
    </ImageBackground>
  </Container>
  )
}

const styles = StyleSheet.create({
  text: {
  },
});

export default LoginScreen;