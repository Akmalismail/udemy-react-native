import React from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen: NavigationStackScreenComponent = (props) => {
  const userProducts = useSelector<RootState, Product[]>(
    (state) => state.products.userProducts
  );
  const dispatch = useDispatch();
  const editProductHandler = (id: string) => {
    props.navigation.navigate("EditProduct", {
      pid: id,
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          key={itemData.item.id}
          item={itemData.item}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navigationData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
