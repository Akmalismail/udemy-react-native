import PRODUCTS from '../../data/dummy-data';

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
