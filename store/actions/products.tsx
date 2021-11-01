import Product from '../../models/product';

// identifier
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

// action types
export type FetchProductAction = {
  type: typeof SET_PRODUCT;
  products: Product[];
};
export type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  pid: string;
};
export type CreateProductAction = {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
};
export type UpdateProductAction = {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: {
    title: string;
    imageUrl: string;
    description: string;
  };
};

// action
export const fetchProduct = (): ((
  dispatch: (action: FetchProductAction) => void
) => Promise<void>) => {
  return async (dispatch) => {
    // any async code you want!
    const response = await fetch(
      "https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );

    const responseData: {
      [key: string]: {
        description: string;
        imageUrl: string;
        price: number;
        title: string;
      };
    } = await response.json();

    const loadedProducts: Product[] = [];

    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: loadedProducts,
    });
  };
};

export const deleteProduct = (productId: string): DeleteProductAction => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (
  title: string,
  imageUrl: string,
  price: number,
  description: string
): ((dispatch: (action: CreateProductAction) => void) => Promise<void>) => {
  return async (dispatch) => {
    // any async code you want!
    const response = await fetch(
      "https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
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
        }),
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
      },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
): UpdateProductAction => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      imageUrl,
      description,
    },
  };
};
