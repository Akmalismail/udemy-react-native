import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../App';
import Product from '../../models/product';

const ProductDetailScreen: NavigationStackScreenComponent = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector<RootState, Product>(
    (state) =>
      state.products.availableProducts.find(
        (product) => product.id === productId
      ) as unknown as Product
  );

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
