import Meal from '../../models/meal';

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const toggleFavorite = ({ id }: Meal) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};
export type ToggleFavoriteAction = ReturnType<typeof toggleFavorite>;
