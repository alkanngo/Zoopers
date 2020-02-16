import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./../screens/HomeScreen";
import MapScreen from "./../screens/MapScreen";

const screens = {
    Home: {
        screen: HomeScreen
    },
    Map: {
        screen: MapScreen
    }, 
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
