import React, {useContext} from 'react';
import { StyleSheet, View, Text, Slider } from 'react-native';
import { Colors, Spacing, Typography } from "../styles";
import { UserContext } from "./../context/UserContext";

const HoopSlider:React.FC = () => {

  const [sliderRadius, setSliderRadius] = useContext(UserContext);

  return (
    <>
      <View style={styles.textGroup}>
        <Text style={styles.text}>Choose radius in which to find Hoops</Text>
        <Text style={styles.km} >{Math.floor(sliderRadius)} m</Text>
      </View>
      <View style={styles.slider}>
        <Slider 
          thumbTintColor={Colors.name.secondary}
          minimumTrackTintColor={Colors.name.secondary}
          maximumTrackTintColor="#FFF"
          minimumValue={0}
          maximumValue={10000}
          value={sliderRadius}
          onValueChange={(value) => setSliderRadius(value)}
        />
      </View>
    </>
        
  )
}

const styles = StyleSheet.create({
  textGroup: {
    bottom: 50,
    alignItems: "center"
  },
  text: {
    fontSize: Typography.size.lg,
    textAlign: "center",
    color: "#FFF"
  },
  km: {
    marginTop: Spacing.margin.lg,
    color: "#FFF"
  },
  slider: {
    marginBottom: Spacing.margin.lg
  },
});

export default HoopSlider;
