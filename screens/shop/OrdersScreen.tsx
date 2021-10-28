import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../App';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Order from '../../models/order';

const OrdersScreen: NavigationStackScreenComponent = () => {
  const orders = useSelector<RootState, Order[]>(
    (state) => state.orders.orders
  );
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

OrdersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Orders",
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
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({});
