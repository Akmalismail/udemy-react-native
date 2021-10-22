import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = (props: HeaderButtonProps) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
