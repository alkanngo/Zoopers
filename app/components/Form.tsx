import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { useAuth } from "./../hooks/useAuth"
import { Colors, Spacing, Typography } from "./../styles"

import * as firebase from "firebase";
import {initFirebase} from "./../config/firebaseConfig";



const LoginForm:React.FC = (props) => {
  // const auth = useAuth();

  // console.log(auth)
  initFirebase;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = (email, password) => {
    try {
      if(password.length < 6) {
        alert("Password needs to ba atleast 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email,password);
      console.log("Success");
    } catch (error) {
      console.log(error.toString())
    }
  }

  const loginUser = (email, password) => {
    
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
        <Item floatingLabel style={{borderBottomWidth: 0}}>
          <Label style={{color: Colors.name.secondary}}>Password</Label>
          <Input 
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            style={{color: "black"}}
            onChangeText={(password) => setPassword(password)}
          />
        </Item>
        <Button
          full
          style={styles.login}
          onPress={() => loginUser(email, password)}
        >
          <Text style={{fontSize: Typography.size.md, color: Colors.name.secondary}}>Login</Text>
        </Button>
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
    height: 350,
    borderRadius: 10,
  },
  login:{
    alignSelf: "center",
    backgroundColor: Colors.name.primary,
    marginTop: Spacing.margin.lg,
    elevation: 100,
    borderRadius: 10,
    width:150,
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
