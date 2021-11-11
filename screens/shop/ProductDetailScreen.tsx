import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { RootState } from '../../App';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { addToCart } from '../../store/actions/cart';
import { ProductDetailScreenProps, ProductsStackParamsList } from '../../types';

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const [imageRatio, setImageRatio] = useState<number>();
  const { height, width } = useWindowDimensions();

  const selectedProduct = useSelector<RootState, Product>(
    (state) =>
      state.products.availableProducts.find(
        (product) => product.id === productId
      ) as unknown as Product
  );
  const dispatch = useDispatch();

  Image.getSize(selectedProduct.imageUrl, (imageWidth, imageHeight) => {
    setImageRatio(imageHeight / imageWidth);
  });

  return (
    <ScrollView>
      <Image
        style={{
          ...styles.image,
          height: imageRatio ? imageRatio * width : 0,
          width: width,
        }}
        source={{ uri: selectedProduct.imageUrl }}
      />

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

export const screenOptions: (props: {
  route: RouteProp<ProductsStackParamsList, "ProductDetail">;
}) => StackNavigationOptions = ({ route }) => {
  return {
    headerTitle: route.params.productTitle,
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {},
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
