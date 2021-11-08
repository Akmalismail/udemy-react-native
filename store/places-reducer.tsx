import { addPlace, loadPlaces } from "./places-action";

import Place from "../models/place";
import { createReducer } from "@reduxjs/toolkit";

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
        action.payload.placeData.image,
        action.payload.placeData.address,
        action.payload.placeData.coords.lat,
        action.payload.placeData.coords.lng
      );

      return {
        places: state.places.concat(newPlace),
      };
    })
    .addCase(loadPlaces.fulfilled, (state, action) => {
      return {
        places: action.payload.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    });
});

export default placesReducer;
