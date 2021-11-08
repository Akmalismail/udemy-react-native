import * as FileSystem from "expo-file-system";

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

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
        place.image,
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
