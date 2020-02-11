import React, {useContext} from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';
import {Button, Container} from "native-base";
import {BigLogo} from "../components/Logo";
import {Colors, Spacing, Typography} from '../styles';
import LoginForm from '../components/Form';
import { UserContext } from "./../context/UserContext"

// import * as firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7BomPpwhwo9YTy6kzr0MY5IMUOZ1D3kA",
//   authDomain: "hoopfinderr.firebaseapp.com",
//   databaseURL: "https://hoopfinderr.firebaseio.com",
//   projectId: "hoopfinderr",
//   storageBucket: "hoopfinderr.appspot.com",
//   messagingSenderId: "851736769620",
//   appId: "1:851736769620:web:f64d3cf13718f5e61629c1"
// };

// firebase.initializeApp(firebaseConfig);

interface ILoginProps {

}

interface ILoginState {
  
}

const signUpUser = (email,password) => {

}
const loginUser = (email,password) => {
  
}

const LoginScreen:React.FC = () => {
  // constructor(props){
    //   super(props)
    
    //   this.state = {
      //     email: "",
      //     password: ""
      //   };
      // }
      
  const [userEmail, setUserEmail] = useContext(UserContext)
  console.log(userEmail);


  // render(){
    return(
      <Container>
      <ImageBackground 
        source={require("./../../assets/bBall.png")} 
        style={{height: '100%'}} 
        resizeMode="cover"
      >
        <BigLogo/>
        <LoginForm />
      </ImageBackground>
    </Container>
    )
  }
//}

const styles = StyleSheet.create({
  text: {
    color: Colors.name.primary,
    fontSize: Typography.size.lg
  },
  button: {
    borderWidth: 3,
    width: 100,
    backgroundColor: "transparent",
    shadowColor: "blue",
    alignSelf: "center",
    borderColor: Colors.name.secondary
    
  }
});

export default LoginScreen;