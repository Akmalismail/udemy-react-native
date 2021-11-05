import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const PlaceDetailScreen: NavigationStackScreenComponent = (props) => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("place").title,
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
