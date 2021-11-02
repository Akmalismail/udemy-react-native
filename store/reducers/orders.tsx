import Order from '../../models/order';
import { ADD_ORDER, AddOrderAction, FetchOrdersAction, SET_ORDERS } from '../actions/orders';

export type OrderState = {
  orders: Order[];
};

const initialState: OrderState = {
  orders: [],
};

export default (
  state = initialState,
  action: AddOrderAction | FetchOrdersAction
): OrderState => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
