import React from 'react';
import { StyleSheet, Text } from 'react-native';

type DefaultTextProps = {
  children?: React.ReactNode;
};

const DefaultText: React.FC<DefaultTextProps> = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
