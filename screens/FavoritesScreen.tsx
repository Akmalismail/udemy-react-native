import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

export interface FavoritesScreenProps {}

const FavoritesScreen: NavigationStackScreenComponent = (props) => {
  const displayedMeals = MEALS.filter(
    (meal) => meal.id === "m1" || meal.id === "m2"
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: "Your Favorites",
};

export default FavoritesScreen;
