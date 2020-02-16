import { Asset } from "expo-asset";
import { AppLoading } from "expo"
import LoginScreen from './app/screens/LoginScreen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from "./app/context/UserContext"
import { ProvideAuth } from "./app/hooks/useAuth";
import Navigator from "./app/routes/homeStack";

interface IAppProps{
}

interface IAppState {
  isReady:boolean;
}


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component <IAppProps ,IAppState>{
  state: IAppState;

  constructor(props){
    super(props)
    
    this.state={
      isReady:false
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/bBall.png'),
    ]);

    //When using fonts pass this aswell with the spreadoperator in the Promise
    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets,]);
  }


  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return(
      <UserProvider>
        <Navigator />
      </UserProvider>
    )
  }
}

const styles = StyleSheet.create({
});
