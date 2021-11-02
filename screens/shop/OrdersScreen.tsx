import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Order from '../../models/order';
import * as orderActions from '../../store/actions/orders';

const OrdersScreen: NavigationStackScreenComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const dispatch = useDispatch();
  const orders = useSelector<RootState, Order[]>(
    (state) => state.orders.orders
  );

  useEffect(() => {
    setIsLoading(true);

    dispatch(
      orderActions.fetchOrders() as unknown as Promise<
        typeof orderActions.fetchOrders
      >
    )
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
