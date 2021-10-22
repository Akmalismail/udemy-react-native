import Product from '../../models/product';

// identifier
export const ADD_TO_CART = "ADD_TO_CART";

// action types
export type AddToCartAction = {
  type: typeof ADD_TO_CART;
  product: Product;
};

// action
export const addToCart = (product: Product): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};
