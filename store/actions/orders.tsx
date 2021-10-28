import CartItem from '../../models/cart-item';
import { TransformedCartItems } from '../../screens/shop/CartScreen';

// identifier
export const ADD_ORDER = "ADD_ORDER";

// action types
export type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    items: TransformedCartItems[];
    amount: number;
  };
};

// action
export const addOrder = (
  cartItems: TransformedCartItems[],
  totalAmount: number
): AddOrderAction => {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  };
};
