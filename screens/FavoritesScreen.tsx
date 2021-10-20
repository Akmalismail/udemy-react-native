import React from 'react';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../App';
import CustomHeaderButton from '../components/CustomHeaderButton';
import MealList from '../components/MealList';
import Meal from '../models/meal';

const FavoritesScreen: NavigationStackScreenComponent = (props) => {
  const favoriteMeals = useSelector<RootState, Meal[]>(
    (state) => state.meals.favoriteMeals
  );

  return <MealList listData={favoriteMeals} navigation={props.navigation} />;
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
