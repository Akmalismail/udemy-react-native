import React from 'react';
import {
    Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View
} from 'react-native';

import Colors from '../../constants/colors';
import { MainButtonProps } from './MainButton';

const MainButton = (props: MainButtonProps) => {
  let ButtonComponent: any = TouchableOpacity;

  if (Platform.Version >= "21") {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style?.button }}>
          <Text style={{ ...styles.buttonText, ...props.style?.buttonText }}>
            {props.children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
