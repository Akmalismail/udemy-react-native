import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp } from '@react-navigation/native';
import {
    StackNavigationOptions, StackNavigationProp, StackScreenProps
} from '@react-navigation/stack';

import { RootState } from '../../App';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import { AdminStackParamsList } from '../../navigation/ShopNavigator';
import * as productActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
type InputIdentifier = string | "title" | "imageUrl" | "description" | "price";
type FormReducerAction = {
  type: typeof FORM_INPUT_UPDATE;
  value: string;
  isValid: boolean;
  input: InputIdentifier;
};
type FormState = {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
  };
  inputValidities: {
    [key in InputIdentifier]: boolean;
  };
  formIsValid: boolean;
};

const formReducer = (
  state: FormState,
  action: FormReducerAction
): FormState => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities: { [key in InputIdentifier]: boolean } = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid && updatedValidities[key as InputIdentifier];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

type EditProductScreenProps = StackScreenProps<
  AdminStackParamsList,
  "EditProduct"
>;

const EditProductScreen: React.FC<EditProductScreenProps> = ({
  route,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const dispatch = useDispatch();
  const prodId = route.params?.productId;
  const editedProduct = useSelector<RootState, Product | undefined>((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: 0,
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: true,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            prodId as string,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          ) as unknown as Promise<typeof productActions.updateProduct>
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description
          ) as unknown as Promise<typeof productActions.createProduct>
        );
      }
      navigation.goBack();
    } catch (error) {
      setError((error as { message: string }).message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (
      inputIdentifier: InputIdentifier,
      inputValue: string,
      inputValidity: boolean
    ) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={-150}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter avalid image URL!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.01}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions: (props: {
  route: RouteProp<AdminStackParamsList, "EditProduct">;
  navigation: StackNavigationProp<AdminStackParamsList, "EditProduct">;
}) => StackNavigationOptions = ({ route, navigation }) => {
  const submitFn = route.params?.submit;
  return {
    headerTitle: route.params?.productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
