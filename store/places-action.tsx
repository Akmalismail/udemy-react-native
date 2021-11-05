import { createAction } from '@reduxjs/toolkit';

export const addPlace = createAction(
  "ADD_PLACE",
  (title: string, image: string) => {
    return {
      payload: {
        placeData: {
          title,
          image,
        },
      },
    };
  }
);
