import { createReducer } from '@reduxjs/toolkit';

import Place from '../models/place';
import { addPlace } from './places-action';

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

const placesReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPlace.fulfilled, (state, action) => {
    const newPlace = new Place(
      new Date().toString(),
      action.payload.placeData.title,
      action.payload.placeData.image
    );

    return {
      places: state.places.concat(newPlace),
    };
  });
});

export default placesReducer;
