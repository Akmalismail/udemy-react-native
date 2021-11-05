import React, { useEffect, useRef } from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';

import { RootState } from '../App';
import ShopNavigator from './ShopNavigator';

const NavigationContainer = () => {
  const navRef = useRef<any>();
  const isAuth = useSelector<RootState, boolean>((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
