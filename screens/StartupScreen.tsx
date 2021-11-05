import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen: NavigationStackScreenComponent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformedData: {
        token: string;
        userId: string;
        expiryDate: string;
      } = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
