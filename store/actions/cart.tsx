import Product from '../../models/product';

// identifier
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// action types
export type AddToCartAction = {
  type: typeof ADD_TO_CART;
  product: Product;
};
export type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  productId: string;
};

// action
export const addToCart = (product: Product): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};

export const removeFromCart = (productId: string): RemoveFromCartAction => {
  return {
    type: REMOVE_FROM_CART,
    productId: productId,
  };
};
