import { RootState } from '../../App';
import Order from '../../models/order';
import { TransformedCartItems } from '../../screens/shop/CartScreen';

// set order
export const SET_ORDERS = "SET_ORDERS";
export type FetchOrdersAction = {
  type: typeof SET_ORDERS;
  orders: Order[];
};
export const fetchOrders = () => {
  return async (
    dispatch: (action: FetchOrdersAction) => void,
    getState: () => RootState
  ) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData: {
        [key: string]: {
          cartItems: TransformedCartItems[];
          date: string;
          totalAmount: number;
        };
      } = await response.json();

      const loadedOrders: Order[] = [];

      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      // send to custom analytic error
      throw error;
    }
  };
};

// add order
export const ADD_ORDER = "ADD_ORDER";
export type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: TransformedCartItems[];
    amount: number;
    date: Date;
  };
};
export const addOrder = (
  cartItems: TransformedCartItems[],
  totalAmount: number
) => {
  return async (
    dispatch: (action: AddOrderAction) => void,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide-42d4f-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
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
