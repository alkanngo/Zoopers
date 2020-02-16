import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const BigLogo:React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('./../../assets/logo.png')}  style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer:{
    marginTop: 70,
    marginBottom: 30,
    width: "100%",
  },
  logo:{
    width: 360,
    height: 118,
  },
});
