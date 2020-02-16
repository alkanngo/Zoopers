import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Container, Spinner} from "native-base";

function LoginScreen() {


    return(
        <Container>
            <ImageBackground 
                source={require("./../../assets/Loading.jpg")} 
                style={styles.background} 
                resizeMode="cover"
            >
                <Spinner color="black"/>
            </ImageBackground>
        </Container>
    )
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default LoadingScreen;
