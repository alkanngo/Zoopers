import React from 'react';
import { StyleSheet, ImageBackground, View, } from 'react-native';
import {BigLogo} from "../components/Logo";
import {Colors, Spacing} from '../styles';


const LoginScreen: React.FC = () => (
    <View>
      <ImageBackground source={require("./../../assets/bBall.png")} style={styles.imgBackground} resizeMode="cover" >
        <BigLogo/>
        <View style={styles.formContainer}>

        </View>
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
  },
  formContainer: {
    backgroundColor: Colors.colors.primary,
    width: 360,
    height: 350,
    opacity: 0.5,
    marginTop: Spacing.margin.md,
    borderRadius: 20,

  }

});

export default LoginScreen;