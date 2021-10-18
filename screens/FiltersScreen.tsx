import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const FiltersScreen: NavigationStackScreenComponent = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
    </View>
  );
};

FiltersScreen.navigationOptions = {
  headerTitle: "Filter Meals",
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
