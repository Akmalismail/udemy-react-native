import { MEALS } from '../../data/dummy-data';
import Meal from '../../models/meal';
import {
    SET_FILTERS, SetFiltersAction, TOGGLE_FAVORITE, ToggleFavoriteAction
} from '../actions/meals';

type MealState = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};

const initialState: MealState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (
  state = initialState,
  action: ToggleFavoriteAction | SetFiltersAction
) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );

      if (existingIndex >= 0) {
        const updatedFavoriteMeals = [...state.favoriteMeals];
        updatedFavoriteMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavoriteMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        if (meal === undefined) {
          return state;
        }

        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }

        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }

        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }

        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }

        return true;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
