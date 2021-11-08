import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { init } from './helpers/db';
import PlacesNavigator from './navigation/PlacesNavigator';
import { rootReducer } from './store/store';

init().then(
  () => {
    console.log("Initialized database");
  },
  (err) => {
    console.log("Initializing db failed");
    console.log(err);
  }
);

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
