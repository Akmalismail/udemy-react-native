import CartItem from '../../models/cart-item';

// identifier
export const ADD_ORDER = "ADD_ORDER";

// action types
export type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    items: CartItem[];
    amount: number;
  };
};

// action
export const addOrder = (
  cartItems: CartItem[],
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
