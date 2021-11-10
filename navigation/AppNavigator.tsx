import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { RootState } from '../App';
import { ProductsNavigator } from './ShopNavigator';

const AppNavigatior = () => {
  const isAuth = useSelector<RootState, boolean>((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigatior;
