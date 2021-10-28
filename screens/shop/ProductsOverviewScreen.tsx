import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Product from '../../models/product';
import { addToCart } from '../../store/actions/cart';

const ProductsOverviewScreen: NavigationStackScreenComponent = (props) => {
  const products = useSelector<RootState, Product[]>(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: item.id,
              productTitle: item.title,
            });
          }}
          onAddToCard={() => {
            dispatch(addToCart(item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            (
              navigationData.navigation as unknown as NavigationDrawerProp
            ).toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navigationData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
