import React, { useEffect, useState, useContext } from 'react';
import MapView, { Circle, Marker,  PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles';
import { Content } from "native-base";
import { UserContext } from "./../context/UserContext";


import LoadingScreen from './LoadingScreen';

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const locations = require("./../../locations.json");

const MapScreen: React.FC = () => {

  // Styling for the map
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
                "color": "#f16a21"
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

  const [location, setLocation] = useState(locations);
  const [latitude, setLatitude] = useState(59.866314);
  const [longitude, setLongitude] = useState(17.639217);
  const [errorMessage, setErrorMessage] = useState("");
  const [sliderRadius, setSliderRadius] = useContext(UserContext);

    const _getLocation = async () => {
    try{
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
        //Prompt the user to give permission
        const response = await Permissions.askAsync(Permissions.LOCATION);
        setErrorMessage("PERMISSION NOT GRANTED");
        console.log(errorMessage);
      }
  
  
      const location = await Location.getCurrentPositionAsync();
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
    catch {
      let status = Location.getProviderStatusAsync();
      if(!(await status).locationServicesEnabled){
        alert("Enable Location Services To Use HoopFinder");
      }
    }



  }
  
  // //takes two arguments that are callbacks
  // navigator.geolocation.getCurrentPosition(
  //   ({ coords: {latitude, longitude} }) => {
  //     setLatitude(latitude); 
  //     setLongitude(longitude); 
  //     () => console.log("State:", {latitude, longitude})
  //   },
  //   (error) => console.log("Error:", error)
  // )
  useEffect(() => {
    _getLocation();
    locations.forEach(hoop => {
      // console.log(hoop)
      const hoopCoords = hoop.coords
      console.log(hoopCoords)

    });

  })

  const renderMarkers = () => {
    locations.forEach(hoop => {
      const hoopCoords = hoop.coords
      console.log(hoop.address)
      return (
        <Marker 
          coordinate={{
            latitude:hoopCoords.latitude ,
            longitude:hoopCoords.longitude
          }}
          title={hoop.name}
          description={hoop.address}
        />
      )
    });
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
              {
                locations && locations.map((hoop, index) => {
                  const hoopCoords = hoop.coords
                  console.log(hoop.address)
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude:hoopCoords.latitude ,
                        longitude:hoopCoords.longitude
                      }}
                      title={hoop.name}
                      description={hoop.address}
                      icon={require("./../../assets/hoopMarker.png")}
                      rotation={-10.8}
                      style={styles.marker}
                    />
                  )
                })
              }
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
    height: 50,
    width: 20,
  }
});

export default MapScreen;