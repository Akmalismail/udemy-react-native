import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface BodyTextProps {
  style?: TextStyle;
  children?: any;
}

const BodyText = (props: BodyTextProps) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

export default BodyText;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
