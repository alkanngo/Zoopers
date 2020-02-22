import {createSwitchNavigator, createAppContainer} from "react-navigation";
import LoadingScreen from "./../screens/LoadingScreen";
import LoginScreen from "./../screens/LoginScreen";
import HomeScreen from "./../screens/HomeScreen";

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    HomeScreen: HomeScreen
})

export default createAppContainer(AppSwitchNavigator)