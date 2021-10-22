import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.error("[AppLoading]", err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
