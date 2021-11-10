import React from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerActions, RouteProp } from '@react-navigation/native';
import {
    StackNavigationOptions, StackNavigationProp, StackScreenProps
} from '@react-navigation/stack';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { AdminStackParamsList } from '../../navigation/ShopNavigator';
import * as productsActions from '../../store/actions/products';

type UserProductsScreenProps = StackScreenProps<
  AdminStackParamsList,
  "UserProducts"
>;

const UserProductsScreen: React.FC<UserProductsScreenProps> = (props) => {
  const userProducts = useSelector<RootState, Product[]>(
    (state) => state.products.userProducts
  );
  const dispatch = useDispatch();

  const editProductHandler = (id: string) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found. maybe start creating some?</Text>
      </View>
    );
  }

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
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions: (props: {
  route: RouteProp<AdminStackParamsList, "UserProducts">;
  navigation: StackNavigationProp<AdminStackParamsList, "UserProducts">;
}) => StackNavigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
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
            navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
