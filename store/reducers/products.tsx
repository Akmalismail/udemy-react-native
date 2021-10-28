import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { DELETE_PRODUCT, DeleteProductAction } from '../actions/products';

export type ProductState = {
  availableProducts: Product[];
  userProducts: Product[];
};

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (
  state = initialState,
  action: DeleteProductAction
): ProductState => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    default:
      return state;
  }
};
