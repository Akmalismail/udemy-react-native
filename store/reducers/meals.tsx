import { MEALS } from '../../data/dummy-data';
import Meal from '../../models/meal';
import { TOGGLE_FAVORITE, ToggleFavoriteAction } from '../actions/meals';

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

const mealsReducer = (state = initialState, action: ToggleFavoriteAction) => {
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
        if (meal) {
          return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
        }
      }
    default:
      return state;
  }
};

export default mealsReducer;
