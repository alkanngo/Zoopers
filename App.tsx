import { Asset } from "expo-asset";
import { AppLoading } from "expo"
import LoginScreen from './app/screens/LoginScreen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component{
  constructor(){
    super()
    
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
      <LoginScreen>
        
      </LoginScreen>
    )
  }
}

const styles = StyleSheet.create({
});
