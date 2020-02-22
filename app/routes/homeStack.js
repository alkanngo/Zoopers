import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./../screens/HomeScreen";
import MapScreen from "./../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";

const screens = {
  Home: {
    screen: HomeScreen
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
    screen: MapScreen
  }, 
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
