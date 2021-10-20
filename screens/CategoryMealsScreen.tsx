import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../App';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';
import Meal from '../models/meal';

const CategoryMealsScreen: NavigationStackScreenComponent = (props) => {
  const catId: string = props.navigation.getParam("categoryId");
  const availableMeals = useSelector<RootState, Meal[]>(
    (state) => state.meals.filteredMeals
  );
  const displayedMeals = availableMeals.filter(
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
