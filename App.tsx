import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
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

  // if font not loaded yet, maintain splash screen
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
      <MealsNavigator />
    </Provider>
  );
}
