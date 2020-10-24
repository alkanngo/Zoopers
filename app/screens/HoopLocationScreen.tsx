import React ,{ useContext } from 'react';
import { Content } from 'native-base';
import { View, StyleSheet, Text, } from 'react-native';
import { Colors, Spacing, Typography } from "./../styles";
import { UserContext } from "./../context/UserContext";


const RegisterScreen: React.FC = () => {
  const [choosenHoopLocation, setChoosenHoopLocation] = useContext(UserContext);


  return (
    <Content contentContainerStyle={styles.content}>
      <Text style={styles.locationName}>{choosenHoopLocation}</Text>
    </Content>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.name.background,
  },
  locationName: {
    width: '100%',
    height: '100%',
    fontFamily: Typography.font.primary,
    paddingTop: 20,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default RegisterScreen;