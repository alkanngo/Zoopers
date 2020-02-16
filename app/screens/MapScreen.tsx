import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import {Colors} from '../styles';


const HomeScreen: React.FC = () => (
    <View>
        <Text>MAPS</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        color: Colors.name.secondary,
    },

});

export default HomeScreen;