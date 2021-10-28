import React from 'react';
import {
    Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View
} from 'react-native';

import Product from '../../models/product';
import Card from '../ui/Card';

type ProductItemProps = {
  item: Product;
  onSelect: () => void;
  children?: React.ReactNode;
};

const ProductItem = ({ item, onSelect, children }: ProductItemProps) => {
  let TouchableComponent: any = TouchableOpacity;

  if (
    Platform.OS === "android" &&
    TouchableNativeFeedback.canUseNativeForeground() &&
    Platform.Version >= 21
  ) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground={true}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
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
    height: "17%",
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
    height: "23%",
    paddingHorizontal: 20,
  },
});
