import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { addToCart } from '../../store/actions/cart';

const ProductDetailScreen: NavigationStackScreenComponent = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector<RootState, Product>(
    (state) =>
      state.products.availableProducts.find(
        (product) => product.id === productId
      ) as unknown as Product
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
