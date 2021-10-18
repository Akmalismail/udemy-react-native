import React from 'react';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import CustomHeaderButton from '../components/CustomHeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoritesScreen: NavigationStackScreenComponent = (props) => {
  const displayedMeals = MEALS.filter(
    (meal) => meal.id === "m1" || meal.id === "m2"
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Favorites",
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

export default FavoritesScreen;
