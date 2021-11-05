import Product from '../../models/product';
import {
    CREATE_PRODUCT, CreateProductAction, DELETE_PRODUCT, DeleteProductAction, FetchProductAction,
    SET_PRODUCT, UPDATE_PRODUCT, UpdateProductAction
} from '../actions/products';

export type ProductState = {
  availableProducts: Product[];
  userProducts: Product[];
};
type ProductActions =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
  | FetchProductAction;

const initialState: ProductState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action: ProductActions): ProductState => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.pid
      );

      const updatedProduct = new Product(
        action.pid,
        state.userProducts[userProductIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
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
