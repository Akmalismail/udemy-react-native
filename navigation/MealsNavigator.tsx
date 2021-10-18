import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, NavigationRoute, NavigationRouteConfigMap } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    createMaterialBottomTabNavigator, NavigationMaterialBottomTabOptions
} from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, NavigationTabProp } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig: NavigationRouteConfigMap<
  NavigationMaterialBottomTabOptions,
  NavigationTabProp<NavigationRoute, any>
> = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: {
        focused: boolean;
        tintColor?: string | undefined;
        horizontal?: boolean | undefined;
      }) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: {
        focused: boolean;
        tintColor?: string | undefined;
        horizontal?: boolean | undefined;
      }) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
  FavoriteMeals: MealsFavTabNavigator,
  Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
