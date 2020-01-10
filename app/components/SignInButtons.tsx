import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Colors, Spacing, Typography} from '../styles';

const {width, height} = Dimensions.get("window");

export const SignInButtons:React.FC = () => {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>SIGN IN</Text>
            </View>
            <View style={{...styles.button, backgroundColor: Colors.colors.secondary}}>
                <Text style={styles.buttonText}>SIGN IN WITH GOOGLE</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: height/3,
        justifyContent: "center",
    },
    button: {
        backgroundColor: "white",
        height: 70,
        marginHorizontal: Spacing.margin.md,
        marginVertical: 5,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: Typography.size.md
    }
});