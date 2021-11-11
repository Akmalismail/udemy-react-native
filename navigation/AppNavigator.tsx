import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { RootState } from '../App';
import StartupScreen from '../screens/StartupScreen';
import { AuthNavigator, ShopNavigator } from './ShopNavigator';

const AppNavigatior = () => {
  const isAuth = useSelector<RootState, boolean>((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector<RootState, boolean>(
    (state) => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigatior;
