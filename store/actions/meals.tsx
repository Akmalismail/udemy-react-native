import Meal from '../../models/meal';

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

export type ToggleFavoriteAction = {
  type: "TOGGLE_FAVORITE";
  mealId: string;
};
export const toggleFavorite = ({ id }: Meal): ToggleFavoriteAction => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export type SetFiltersAction = {
  type: "SET_FILTERS";
  filters: FilterSettings;
};
export const setFilters = (
  filterSettings: FilterSettings
): SetFiltersAction => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};

export type FilterSettings = {
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
};
