import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { useAuth } from "../hooks/useAuth";
import { Colors, Spacing, Typography } from "../styles";
import { UserContext } from "../context/UserContext";
import HoopButton from "./HoopButton";

import * as firebase from "firebase";
import {initFirebase} from "../config/firebaseConfig";



function LoginForm(props) {
  // const auth = useAuth();

  // console.log(auth)
  initFirebase;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext)

  const signupUser = (email, password) => {
    try {
      if(password.length < 6) {
        alert("Password needs to ba atleast 6 characters")
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        alert("Ur now a member!!!!!! HOOORAY")
    } catch (error) {
      console.log(error.toString())
    }
  }

  const loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((user) => {
          console.log(user)
        })
    } catch (error) {
      console.log(error.toString())
    }
  }

  const handleLogin = (email, password) => {
    loginUser(email, password);
    setIsLoggedIn(true);
  }


  return (
    <Content padder style={styles.container}>
      <Form style={styles.form}>
        <Item floatingLabel style={{borderBottomWidth: 0}}>
          <Label style={{color: Colors.name.secondary}}>Email</Label>
          <Input 
            autoCorrect={false}
            autoCapitalize="none"
            style={{color: "white"}}
            onChangeText={(email) => setEmail(email)}
          />
        </Item>
        <Item floatingLabel style={{borderBottomWidth: 0, marginBottom: Spacing.margin.lg}}>
          <Label style={{color: Colors.name.secondary}}>Password</Label>
          <Input 
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            style={{color: "black"}}
            onChangeText={(password) => setPassword(password)}
          />
        </Item>
        <HoopButton
          value="Login"
          onPress={() => handleLogin(email, password)}
        />
        <View style={{margin: Spacing.margin.sm}} />
        <HoopButton
          value="GoogleLogin"
          onPress={() => signInWithGoogleAsync()}
        />

        <Button
          full
          bordered
          small
          style={styles.signup}
          onPress={() => signupUser(email, password)}
        >
          <Text style={{fontSize: Typography.size.xs, color: Colors.name.secondary}}>Sign Up</Text>
        </Button>
      </Form>
    </Content>
  );
}

const styles = StyleSheet.create({
  container:{
  },
  form:{
    justifyContent: "center",
    alignItems: "center",
    height: 360,
    borderRadius: 10,
  },
  signup:{
    alignSelf: "center",
    borderRadius: 0,
    borderColor: Colors.name.secondary,
    marginTop: Spacing.margin.xxxl,
    width:100,
    marginBottom:0,
  }
});

export default LoginForm;
