import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View
} from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { addToCart } from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen: NavigationStackScreenComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null>();
  const products = useSelector<RootState, Product[]>(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log("loadProducts");
    setError(null);
    setIsLoading(true);
    // some delay
    setTimeout(async () => {
      try {
        await dispatch(
          productActions.fetchProduct() as unknown as Promise<
            typeof productActions.fetchProduct
          >
        );
      } catch (error) {
        console.error("dispatch(productActions.fetchProduct())", error);
        setError((error as any).message);
      }
      setIsLoading(false);
    }, 2000);
  }, [dispatch, setIsLoading, setError]);

  // refetch
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (item: Product) => {
    props.navigation.navigate("ProductDetail", {
      productId: item.id,
      productTitle: item.title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured.</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onSelect={() => {
            selectItemHandler(item);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(item);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(addToCart(item));
            }}
          />
        </ProductItem>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
