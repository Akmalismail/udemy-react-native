import CartItem from '../../models/cart-item';
import {
    ADD_TO_CART, AddToCartAction, REMOVE_FROM_CART, RemoveFromCartAction
} from '../actions/cart';
import { ADD_ORDER, AddOrderAction } from '../actions/orders';
import { DELETE_PRODUCT, DeleteProductAction } from '../actions/products';

export type CartState = {
  items: Record<string, CartItem>;
  totalAmount: number;
};

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export default (
  state = initialState,
  action:
    | AddToCartAction
    | RemoveFromCartAction
    | AddOrderAction
    | DeleteProductAction
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;
      let updatedOrNewCartItem: CartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          pushToken,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        // not in cart yet
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          pushToken,
          productPrice
        );
      }

      return {
        // no need because no additional data
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.productId];
      const currentQuantity = selectedProduct.quantity;
      let updatedCartItems: { [x: string]: CartItem };

      if (currentQuantity > 1) {
        // need to reduce it
        const updatedCartItem = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.pushToken,
          selectedProduct.sum - selectedProduct.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        // need to erase it
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        // no need because no additional data
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }

      const updatedItems = state.items;
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
