import CartItem from '../../models/cart-item';
import { TransformedCartItems } from '../../screens/shop/CartScreen';

// identifier
export const ADD_ORDER = "ADD_ORDER";

// action types
export type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: TransformedCartItems[];
    amount: number;
    date: Date;
  };
};

// action
export const addOrder = (
  cartItems: TransformedCartItems[],
  totalAmount: number
) => {
  return async (dispatch: (action: AddOrderAction) => void) => {
    const date = new Date();
    const response = await fetch(
      "https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          data: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
