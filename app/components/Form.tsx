import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { useAuth } from "./../hooks/useAuth";
import { Colors, Spacing, Typography } from "./../styles";
import { UserContext } from "./../context/UserContext";
import HoopButton from "./HoopButton";
import * as Google from 'expo-google-app-auth';

import * as firebase from "firebase";
import {initFirebase} from "./../config/firebaseConfig";



function LoginForm(props) {
  // const auth = useAuth();

  // console.log(auth)
  initFirebase;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext)
  const [isSignedIn, setIsSignedIn] = useContext(UserContext);
  const [name, setName] = useContext(UserContext);
  const [photoUrl , setPhotoUrl] = useContext(UserContext);

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

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      let providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    let unsubscribe = firebase.auth().onAuthStateChanged(
      (firebaseUser) => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          let credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
              console.log('user signed in ');
              setIsSignedIn(true);
              setName(result.user.displayName);
              setPhotoUrl(result.user.photoURL);
              //Check if new user to prevent overwriting data over and over
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              // The email of the user's account used.
              let email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              let credential = error.credential;
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }
    );
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: "851736769620-6c3e9onbeo4lj2ln1jdujt87p8iogrm7.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
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
    height: 350,
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
