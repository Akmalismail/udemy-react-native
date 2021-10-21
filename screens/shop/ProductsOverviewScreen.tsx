import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../App';
import Product from '../../models/product';

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useSelector<RootState, Product[]>(
    (state) => state.products.availableProducts
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
