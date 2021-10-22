import CartItem from '../../models/cart-item';
import { AddToCartAction } from '../actions/cart';

export type CartState = {
  items: Record<string, CartItem>;
  totalAmount: number;
};

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action: AddToCartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrNewCartItem: CartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        // not in cart yet
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      return {
        // no need because no additional data
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    default:
      return state;
  }
};
