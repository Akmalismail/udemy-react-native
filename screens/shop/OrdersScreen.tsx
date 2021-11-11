import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerActions, RouteProp } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import { RootState } from '../../App';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Order from '../../models/order';
import * as orderActions from '../../store/actions/orders';
import { OrdersScreenProps, OrdersStackParamsList } from '../../types';

const OrdersScreen: React.FC<OrdersScreenProps> = () => {
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
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No orders found. maybe start ordering some products?</Text>
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

export const screenOptions: (props: {
  route: RouteProp<OrdersStackParamsList, "Orders">;
  navigation: StackNavigationProp<OrdersStackParamsList, "Orders">;
}) => StackNavigationOptions = ({ route, navigation }) => {
  return {
    headerTitle: "Your Orders",
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
