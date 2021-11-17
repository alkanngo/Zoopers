import React ,{ useContext, useEffect, useReducer, useState } from 'react';
import { Content, Spinner } from 'native-base';
import { StyleSheet, Text, Image, ColorPropType } from 'react-native';
import { Colors, Spacing, Typography } from "../styles";
import { UserContext } from "./../context/UserContext";
import { Rating } from "react-native-rating-element";
import { db } from "../config/firebaseConfig";

interface ILocations {
  id : number
  address : string;
  coords : {
    latitude: number;
    longitude: number;
  }
  image_url : string;
  name : string;
  rating : number;
}


//TODO:Fix issue with locationdata only rendering adter refresh
const HoopLocationScreen: React.FC = () => {

  const [choosenHoopLocationID, setChoosenHoopLocation] = useContext(UserContext);
  const [hoopRating, setHoopRating] = useState();
  const [locationsList, setLocationsList] = useState([]);
  const [hoopName, setHoopName] = useState();
  const [hoopImage, setHoopImage] = useState();

  useEffect  (() => {
    _readLocationData()
    if(locationsList.length > 0) {
        setHoopRating(locationsList[choosenHoopLocationID].rating)
        setHoopName(locationsList[choosenHoopLocationID].name)
      };
      


  },[choosenHoopLocationID])


  // Read data from firebase realtime database
  const _readLocationData = async () => {
    const locationRef = db.ref("/locations");
    await locationRef.on("value", (snapshot) => {
      const locations = snapshot.val();
      const locationsList: ILocations[] = [];
      for (let id in locations) {
        locationsList.push(locations[id])
      }
      setLocationsList(locationsList);
    })
  }

  if(hoopRating !== null ) {
    return (
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.locationName}>{hoopName}</Text>
        {/* <Image style={styles.image} source={{uri:hoopImage}}/> */}
        <Text style={styles.rating}>This hoop has a {<Text style={styles.nr}>{hoopRating}</Text>} average rating</Text> 
        <Rating
          rated={hoopRating}
          totalCount={5}
          ratingColor={Colors.name.secondary}
          ratingBackgroundColor="#d4d4d4"
          size={50}
          icon="ios-star"
        />
      </Content>
    );
  } else {
    return (
      <Content contentContainerStyle={styles.content}>
        <Spinner color={Colors.name.secondary}/>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.name.background,
  },
  locationName: {
    width: '100%',
    fontFamily: Typography.font.primary,
    paddingTop: 20,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    alignSelf: "flex-start"
  },
  rating:{
    alignSelf: "center",
    fontFamily: Typography.font.primary,
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200
  },
  nr: {
    fontSize: 50,
    letterSpacing: 2
  }
});

export default HoopLocationScreen;