import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "native-base";
import { Colors, Spacing, Typography } from "../styles"


interface IButtonProps {
  onPress(): void,
  value: string,
  danger?: boolean,
}

const HoopButton:React.FC<IButtonProps> = (props) => {
  return (
    <View>
      <Button
        full
        style={props.danger ? styles.danger : styles.button}
        onPress={props.onPress}
      >
          <Text style={props.danger ? styles.dangerText : styles.text}>
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
  danger: {
    alignSelf: "center",
    backgroundColor: Colors.name.secondary,
    borderRadius: 10,
    width:150,
  },
  text: {
    fontSize: Typography.size.md,
    color: Colors.name.secondary
  },
  dangerText: {
    fontSize: Typography.size.md,
    color: Colors.name.primary
  }
});

export default HoopButton;
