import * as FileSystem from "expo-file-system";

import { fetchPlaces, insertPlace } from "../helpers/db";

import ENV from "../env";
import Place from "../models/place";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = createAsyncThunk(
  ADD_PLACE,
  async (place: {
    title: string;
    image: string;
    location: { lat: number; lng: number };
  }) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        place.location.lat
      },${place.location.lng}&key=${ENV().googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    if (!responseData.results) {
      throw new Error("Missing results!");
    }

    const address = responseData.results[0].formatted_address;
    const fileName = place.image.split("/").pop();
    const newPath = (FileSystem.documentDirectory as string) + fileName;

    try {
      await FileSystem.moveAsync({
        from: place.image,
        to: newPath,
      });

      const dbResult = await insertPlace({
        title: place.title,
        imageUri: newPath,
        address: address,
        lat: place.location.lat,
        lng: place.location.lng,
      });

      return {
        placeData: {
          id: dbResult.insertId,
          title: place.title,
          image: newPath,
          address: address,
          coords: place.location,
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

export const loadPlaces = createAsyncThunk(SET_PLACES, async (_) => {
  try {
    const dbResult = await fetchPlaces();
    return {
      places: dbResult.rows._array as Place[],
    };
  } catch (error) {
    throw error;
  }
});
