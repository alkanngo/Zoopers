import React, { useEffect, useState, useContext, useCallback } from 'react';
import MapView, { Circle, Marker,  PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles';
import { Content } from "native-base";
import { UserContext } from "./../context/UserContext";
import {db} from "./../config/firebaseConfig";


import LoadingScreen from './LoadingScreen';

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const hoopLocations = require("./../../hoopLocations.json");
const geolib = require('geolib');
import HMarker from "../../assets/hoopMarker.svg";

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

const MapScreen = ({navigation}) => {
  
  useEffect(() => {
    _getUserLocation();
    // _readLocationData();
  })
  
  const [locationsList, setLocationsList] = useState([]);
  const [latitude, setLatitude] = useState(59.866314);
    const [longitude, setLongitude] = useState(17.639217);
    const [errorMessage, setErrorMessage] = useState("");
    const [sliderRadius, setSliderRadius] = useContext(UserContext);
    const [choosenHoopLocationID, setChoosenHoopLocationID] = useContext(UserContext);
  
  // Styling for the map, TODO: MOVE THIS ELSEWHERE
  const MapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#e5e5e5"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": "20"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f46900"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f16a21"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#434343"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d7d7d7"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": "00"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d8d8d8"
            },
            {
                "lightness": "20"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#262626"
            }
        ]
      }
    ];

  //TODO: Read data from firebase cloud instead of locally
  const _readLocationData = async () => {
    try{
      const locationRef = db.ref("/locations");
      await locationRef.on("value", (snapshot) => {
        const locations = snapshot.val();
        if (locations !== null) {
          const locationsList: ILocations[] = [];
          for (let id in locations) {
            locationsList.push(locations[id])
          }
          
          setLocationsList(locationsList);
        }
      })
    }
    catch (err){
      console.log(err)
    }
  }

  // Used to get user position
  const _getUserLocation = async () => {
    try{
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        //Prompt the user to give permission
        const response = await Permissions.askAsync(Permissions.LOCATION);
        setErrorMessage("PERMISSION NOT GRANTED");
        console.log(errorMessage);
      }
      const userLocation = await Location.getCurrentPositionAsync();
      setLatitude(userLocation.coords.latitude);
      setLongitude(userLocation.coords.longitude);
    }
    catch {
      let status = Location.getProviderStatusAsync();
      if(!(await status).locationServicesEnabled){
        alert("Enable Location Services To Use HoopFinder");
      }
    }
  }

  // This function uses geolib to calculate the distance between the points
  const calculateDistance = (origLat, origLon, markerLat, markerLon)  =>{
    return geolib.getDistance(
      {latitude: origLat, longitude: origLon},
      {latitude: markerLat, longitude: markerLon}
    );
  }

  const renderMarkers = () => {
    return(
      //Filter to only show markers inside of circle
      //Had to use local db cuz i cant make firebase work properlly, look at _readLocationData()
      hoopLocations.filter(marker => {
  
        let distance = calculateDistance(
          latitude,
          longitude,
          marker.coords.latitude,
          marker.coords.longitude
        );
  
        return distance <= sliderRadius;
  
      }).map((hoop, index) => {
  
        const handleClick = () => {
          setChoosenHoopLocationID(hoop.id)
          navigation.push("HoopLocation");
        };
  
        const hoopCoords = hoop.coords
  
        return (
            <Marker
              key={index}
              coordinate={{
                latitude:hoopCoords.latitude ,
                longitude:hoopCoords.longitude
              }}
              title={hoop.name}
              description={hoop.address}
              style={styles.marker}
              onPress={() => {console.log(hoop)}}
              onCalloutPress={() => {
                handleClick()
              }}
            >
                {/*Svg-marker*/}
                <HMarker height={"100%"} width={"100%"}/>
            </Marker>
        )
      })
    )
  }

  if(latitude){
    return (
    <Content contentContainerStyle={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        loadingEnabled
        style={styles.map} 
        customMapStyle={MapStyle}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05
        }}
        >
          <Circle
            center={{latitude, longitude}}
            radius={sliderRadius}
            fillColor={Colors.name.secondary60Opacity}
            strokeWidth={2}
            strokeColor="white"
            />
            {renderMarkers()}
        </MapView>
    </Content>
    )
  }
  return (
    <Content style={styles.container}>
      <LoadingScreen>
      <Text>Checking ur Location</Text>
      </LoadingScreen>
    </Content>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  marker: {
    height: 100,
    width: 100,
  }
});

export default MapScreen;