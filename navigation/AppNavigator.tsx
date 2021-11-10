import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootState } from '../App';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const MyStack = createStackNavigator();

const AppNavigatior = () => {
  const isAuth = useSelector<RootState, boolean>((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigatior;
