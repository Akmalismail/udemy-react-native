import { createReducer } from "@reduxjs/toolkit";

import Place from "../models/place";
import { addPlace, loadPlaces } from "./places-action";

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

const placesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPlace.fulfilled, (state, action) => {
      const newPlace = new Place(
        (action.payload.placeData.id as number).toString(),
        action.payload.placeData.title,
        action.payload.placeData.image
      );

      return {
        places: state.places.concat(newPlace),
      };
    })
    .addCase(loadPlaces.fulfilled, (state, action) => {
      return {
        places: action.payload.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    });
});

export default placesReducer;
