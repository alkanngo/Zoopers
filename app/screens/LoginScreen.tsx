import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import {BigLogo} from "../components/Logo";
import {LoginForm} from '../components/Forms';
import {Colors, Spacing, Typography} from '../styles';
import { SignInButtons } from '../components/SignInButtons';

const {width, height} = Dimensions.get("window");

class LoginScreen extends Component {

  render(){
    return(
      <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFill }}>
          <Image 
          source={require("./../../assets/bBall.png")}
          style={styles.imgBackground}
        />
        </View>
        <SignInButtons />
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent:"flex-end",
  },
  imgBackground: {
    width: null,
    height: null,
    flex: 1,
  }
});

export default LoginScreen;