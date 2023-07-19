import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface TitleTextProps {
  style?: TextStyle;
  children?: any;
}

const TitleText = (props: TitleTextProps) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
