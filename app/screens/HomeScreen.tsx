import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import {Colors} from '../styles';


const HomeScreen: React.FC = () => (
    <View>
        <Text>HEMMASKÄRM</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        color: Colors.colors.secondary,
    },

});

export default HomeScreen;