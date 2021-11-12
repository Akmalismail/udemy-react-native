import type { StackScreenProps } from "@react-navigation/stack";
import CartItem from './models/cart-item';

// Navigation Params List.
export type ProductsStackParamsList = {
  ProductsOverview: undefined;
  ProductDetail: {
    productId: string;
    productTitle: string;
  };
  Cart: undefined;
};
export type OrdersStackParamsList = {
  Orders: undefined;
};
export type AdminStackParamsList = {
  UserProducts: undefined;
  EditProduct:
    | {
        productId: string;
        submit?: () => void;
      }
    | undefined;
};
export type ShopDrawerParamsList = {
  Products: undefined;
  OrdersDrawer: undefined;
  Admin: undefined;
};
export type AuthStackParamsList = {
  Auth: undefined;
};

// Screen Props
export type ProductsOverviewScreenProps = StackScreenProps<
  ProductsStackParamsList,
  "ProductsOverview"
>;
export type ProductDetailScreenProps = StackScreenProps<
  ProductsStackParamsList,
  "ProductDetail"
>;
export type CartScreenProps = StackScreenProps<ProductsStackParamsList, "Cart">;
export type OrdersScreenProps = StackScreenProps<
  OrdersStackParamsList,
  "Orders"
>;
export type UserProductsScreenProps = StackScreenProps<
  AdminStackParamsList,
  "UserProducts"
>;
export type EditProductScreenProps = StackScreenProps<
  AdminStackParamsList,
  "EditProduct"
>;
export type AuthScreenProps = StackScreenProps<AuthStackParamsList, "Auth">;

// Custom Types
export type TransformedCartItems = CartItem & {
  productId: string;
};
export type HttpProducts = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  ownerId: string;
  ownerPushToken: string;
};
