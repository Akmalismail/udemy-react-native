// identifier
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// action types
export type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  pid: string;
};
export type CreateProductAction = {
  type: typeof CREATE_PRODUCT;
  productData: {
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
): CreateProductAction => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      imageUrl,
      price,
      description,
    },
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
