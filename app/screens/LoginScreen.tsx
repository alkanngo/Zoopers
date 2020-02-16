import React, {useContext} from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';
import {Button, Container} from "native-base";
import {BigLogo} from "../components/Logo";
import {Colors, Spacing, Typography} from '../styles';
import LoginForm from '../components/Form';
import { UserContext } from "./../context/UserContext"

function LoginScreen() {


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