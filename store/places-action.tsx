import * as FileSystem from 'expo-file-system';

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const ADD_PLACE = "ADD_PLACE";
// export const addPlace = createAction(
//   ADD_PLACE,
//   (title: string, image: string) => {
//     // const fileName = newPlace.image.split("/").pop();
//     // const newPath = (FileSystem.documentDirectory as string) + fileName;

//     // try {
//     //   await FileSystem.moveAsync({
//     //     from: newPlace.image,
//     //     to: newPath,
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     //   throw error;
//     // }
//     // return  dispatch({
//     //   type: ADD_PLACE,
//     //   placeData: {
//     //     title: newPlace.title,
//     //     image: newPath,
//     //   },
//     // });

//     return {
//       payload: {
//         placeData: {
//           title: title,
//           image: image,
//         },
//       },
//     };
//   }
// );

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
      console.log(error);
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
