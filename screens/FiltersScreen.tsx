import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import CustomHeaderButton from '../components/CustomHeaderButton';

const FiltersScreen: NavigationStackScreenComponent = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
    </View>
  );
};

FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            (
              navigationData.navigation as any as NavigationDrawerProp<{}>
            ).toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
