import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "native-base";
import { Colors, Spacing, Typography } from "../styles"


interface IButtonProps {
  onPress(): void,
  value: string,
}

const HoopButton:React.FC<IButtonProps> = (props) => {
  return (
    <View>
      <Button
        full
        style={styles.button}
        onPress={props.onPress}
      >
          <Text style={{fontSize: Typography.size.md, color: Colors.name.secondary}}>
            {props.value}
          </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: Colors.name.primary,
    borderRadius: 10,
    width:150,
  },
});

export default HoopButton;
