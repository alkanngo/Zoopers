import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7BomPpwhwo9YTy6kzr0MY5IMUOZ1D3kA",
  authDomain: "hoopfinderr.firebaseapp.com",
  databaseURL: "https://hoopfinderr.firebaseio.com",
  projectId: "hoopfinderr",
  storageBucket: "hoopfinderr.appspot.com",
  messagingSenderId: "851736769620",
  appId: "1:851736769620:web:f64d3cf13718f5e61629c1"
};

export const initFirebase = firebase.initializeApp(firebaseConfig);

export const db = initFirebase.database(); 
