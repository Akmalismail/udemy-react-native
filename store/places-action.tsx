import { createAction } from '@reduxjs/toolkit';

export const addPlace = createAction("ADD_PLACE", (title: string) => {
  return {
    payload: {
      placeData: {
        title,
      },
    },
  };
});
