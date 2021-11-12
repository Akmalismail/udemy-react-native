import * as Notifications from 'expo-notifications';

import { RootState } from '../../App';
import Product from '../../models/product';
import { HttpProducts } from '../../types';

// create
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export type CreateProductAction = {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    ownerId: string;
    pushToken: string | null;
  };
};
export const createProduct = (
  title: string,
  imageUrl: string,
  price: number,
  description: string
) => {
  return async (
    dispatch: (action: CreateProductAction) => void,
    getState: () => RootState
  ) => {
    let pushToken: string | null = null;
    let permissionStatus = await Notifications.getPermissionsAsync();

    if (!permissionStatus.granted) {
      permissionStatus = await Notifications.requestPermissionsAsync();
    }

    if (permissionStatus.granted) {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        } as HttpProducts),
      }
    );

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        imageUrl,
        price,
        description,
        ownerId: userId as string,
        pushToken: pushToken,
      },
    });
  };
};

// read
export const SET_PRODUCT = "SET_PRODUCT";
export type FetchProductAction = {
  type: typeof SET_PRODUCT;
  products: Product[];
  userProducts: Product[];
};
export const fetchProduct = () => {
  return async (
    dispatch: (action: FetchProductAction) => void,
    getState: () => RootState
  ) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        "https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        const errorJson = await response.json();
        console.log("fetchProduct", errorJson);
        const errorId = errorJson.error.message;
        let message = "Something went wrong!";

        throw new Error(message);
      }

      const responseData: {
        [id: string]: HttpProducts;
      } = await response.json();

      const loadedProducts: Product[] = [];

      for (const id in responseData) {
        loadedProducts.push(
          new Product(
            id,
            responseData[id].ownerId,
            responseData[id].ownerPushToken,
            responseData[id].title,
            responseData[id].imageUrl,
            responseData[id].description,
            responseData[id].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (error) {
      // send to custom analytic error
      throw error;
    }
  };
};

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export type UpdateProductAction = {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: {
    title: string;
    imageUrl: string;
    description: string;
  };
};
export const updateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
) => {
  return async (
    dispatch: (action: UpdateProductAction) => void,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      console.log("updateProduct", errorJson);
      const errorId = errorJson.error.message;
      let message = "Something went wrong!";

      throw new Error(message);
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageUrl,
        description,
      },
    });
  };
};

// delete
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  pid: string;
};
export const deleteProduct = (productId: string) => {
  return async (
    dispatch: (action: DeleteProductAction) => void,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      console.log("deleteProduct", errorJson);
      const errorId = errorJson.error.message;
      let message = "Something went wrong!";

      throw new Error(message);
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};
