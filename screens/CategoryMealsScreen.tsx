import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import MealList from '../components/MealList';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealsScreen: NavigationStackScreenComponent = (props) => {
  const catId: string = props.navigation.getParam("categoryId");
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId: string = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory?.title,
  };
};

export default CategoryMealsScreen;
