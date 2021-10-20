import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationParams, NavigationRoute } from 'react-navigation';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useSelector } from 'react-redux';

import { RootState } from '../App';
import Meal from '../models/meal';
import MealItem from './MealItem';

type MealListProps = {
  listData: any[];
  navigation: StackNavigationProp<NavigationRoute, NavigationParams>;
};

const MealList = (props: MealListProps) => {
  const favoriteMeals = useSelector<RootState, Meal[]>(
    (state) => state.meals.favoriteMeals
  );

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <MealItem
        item={item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: item.id,
              mealTitle: item.title,
              isFavorite: favoriteMeals.some((meal) => meal.id === item.id),
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
