import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const NewPlaceScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>NewPlaceScreen</Text>
    </View>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
