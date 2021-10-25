import Order from '../../models/order';
import { ADD_ORDER, AddOrderAction } from '../actions/orders';

export type OrderState = {
  orders: unknown[];
};

const initialState: OrderState = {
  orders: [],
};

export default (state = initialState, action: AddOrderAction): OrderState => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
