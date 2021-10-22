import React from 'react';
import {
    Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View
} from 'react-native';

import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { AddToCartAction } from '../../store/actions/cart';

type ProductItemProps = {
  item: Product;
  onViewDetail: () => void;
  onAddToCard: () => void;
};

const ProductItem = ({ item, onViewDetail, onAddToCard }: ProductItemProps) => {
  let TouchableComponent: any = TouchableOpacity;

  if (
    Platform.OS === "android" &&
    TouchableNativeFeedback.canUseNativeForeground() &&
    Platform.Version >= 21
  ) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onViewDetail} useForeground={true}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="Add To Cart"
                onPress={onAddToCard}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});
