import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const BigLogo:React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('./../../assets/logo.png')}  style={styles.logo} />
    </View>
  );
}

export const MiniLogo:React.FC = () => {
  return (
    <View style={styles.miniContainer}>
      <Image
        style={styles.mini}
        source={require("./../../assets/miniLogo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 220
  },
  miniContainer:{
    width: "100%",
  },
  logo:{
    width: 360,
    height: 118,
  },
  mini: {
    width: 200, 
    height: 44,
  }
});
