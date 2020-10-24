import React from 'react';
import * as Font from "expo-font"
import { Asset } from "expo-asset";
import { AppLoading } from "expo"
import { ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { UserProvider } from "./app/context/UserContext"
// ToDo: implement this hook
import { ProvideAuth } from "./app/hooks/useAuth";
import RootApp from "./app/routes/homeStack";
import { Container } from 'native-base';


interface IAppProps{
}

interface IAppState {
  isReady:boolean;
  fontsLoaded: boolean;
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

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component <IAppProps ,IAppState>{
  state: IAppState;

  constructor(props){
    super(props)
    
    this.state={
      isReady: false,
      fontsLoaded: false,
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/bBall.png'),
    ]);
    await Promise.all([...imageAssets,]);
    await Font.loadAsync({
      "sportsnights-ns": require("./assets/fonts/SFSportsNightNS.ttf"),  
    });
    this.setState({ fontsLoaded: true });
  }

  // // create a helper function to load the font 
  // _loadFontsAsync = async () => {
  //   return Font.loadAsync({
  //     SFSportsNightsNS: require("./assets/fonts/SFSportsNightNS.ttf")
  //   }).then(() => this.setState({ fontsLoaded: true }) )

   // };

  async componentDidMount() {
    
    await Font.loadAsync({
      "SFSportsNightNS": require("./assets/fonts/SFSportsNightNS.ttf"),  
    });
    this.setState({ fontsLoaded: true });

  }




  render(){
    const {fontsLoaded} = this.state
    if (!this.state.isReady) {
      return (

        <Container style={styles.container}>
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </Container>
      );
    } else if (fontsLoaded){
      return(
        <UserProvider>
          <RootApp />
        </UserProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
},
});
