import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import CustomHeaderButton from '../components/CustomHeaderButton';

const PlacesListScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Places"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navigationData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
