import * as FileSystem from 'expo-file-system';

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

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
    } catch (error) {
      throw error;
    }

    return {
      placeData: {
        title: place.title,
        image: newPath,
      },
    };
  }
);
