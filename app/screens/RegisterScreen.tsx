import React from 'react';
import { View, StyleSheet, ImageBackground, } from 'react-native';
import {BigLogo} from "../components/Logo";

const RegisterScreen: React.FC = () => {
  return (
    <View>
      <ImageBackground source={require("./../../assets/bBall.png")} style={styles.imgBackground} resizeMode="cover" >
        <BigLogo/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
  },
});

export default RegisterScreen;