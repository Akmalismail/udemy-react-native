// identifier
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// action types
export type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  pid: string;
};

// action
export const deleteProduct = (productId: string): DeleteProductAction => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};
