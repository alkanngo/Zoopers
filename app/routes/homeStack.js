import React from "react";

import { createStackNavigator, stack } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { MiniLogo } from "./../components/Logo";
import {Colors, Spacing, Typography} from '../styles';


import HomeScreen from "./../screens/HomeScreen";
import MapScreen from "./../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import HoopLocationScreen from "../screens/HoopLocationScreen";


const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: props => <MiniLogo {...props} />,
      headerStyle: {
        height: 120,
        backgroundColor: Colors.name.primary,
        elevation: 0
      },
      headerTitleAlign: "center"
    }
  },
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      headerTintColor: Colors.name.secondary,
      headerStyle: {
        backgroundColor: Colors.name.primary
      },
    }
  },
  HoopLocation: {
    screen: HoopLocationScreen,
    navigationOptions: {
      headerTintColor: Colors.name.secondary,
      headerStyle: {
        backgroundColor: Colors.name.primary
      },
    }
  }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
