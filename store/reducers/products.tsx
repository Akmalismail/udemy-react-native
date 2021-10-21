import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

export type ProductState = {
  availableProducts: Product[];
  userProducts: Product[];
};

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action: unknown) => {
  return state;
};
