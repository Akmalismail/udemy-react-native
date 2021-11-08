import * as FileSystem from "expo-file-system";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = createAsyncThunk(
  ADD_PLACE,
  async (place: { title: string; image: string }) => {
    const fileName = place.image.split("/").pop();
    const newPath = (FileSystem.documentDirectory as string) + fileName;

    try {
      await FileSystem.moveAsync({
        from: place.image,
        to: newPath,
      });

      const dbResult = await insertPlace(
        place.title,
        newPath,
        "Dummy Address",
        15.6,
        12.3
      );

      return {
        placeData: {
          id: dbResult.insertId,
          title: place.title,
          image: newPath,
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
      places: dbResult.rows._array as Array<{
        address: string;
        id: number;
        imageUri: string;
        lat: number;
        lng: number;
        title: string;
      }>,
    };
  } catch (error) {
    throw error;
  }
});
