import React from 'react';
import { StyleSheet, ImageBackground, View, } from 'react-native';
import {BigLogo} from "../components/Logo";
import {LoginForm} from '../components/Forms';
import {Colors} from '../styles';


const LoginScreen: React.FC = () => (
    <View>
      <ImageBackground source={require("./../../assets/bBall.png")} style={styles.imgBackground} resizeMode="cover" >
        <BigLogo/>
        <LoginForm />
      </ImageBackground>
    </View>
)

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
  },
  button: {
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 50,
    borderWidth: 1,
    borderColor: Colors.colors.secondary,
  },
  text: {
    color: Colors.colors.secondary,
  }

});

export default LoginScreen;