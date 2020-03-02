import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { Content } from "native-base";

import { Colors } from '../styles';
import MapView from "react-native-maps";

const MapScreen: React.FC = () => (

  <Content contentContainerStyle={styles.container}>
    <MapView style={styles.mapStyle}/>
  </Content>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: "100%",
    height: "100%"
  }
});

export default MapScreen;