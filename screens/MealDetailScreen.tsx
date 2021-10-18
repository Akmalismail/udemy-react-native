import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import CustomHeaderButton from '../components/CustomHeaderButton';
import { MEALS } from '../data/dummy-data';

const MealDetailScreen: NavigationStackScreenComponent = (props) => {
  const mealId: string = props.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal?.title}</Text>
      <Button
        title="Go Back to Categores"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId: string = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: selectedMeal?.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log("Mark as Favorite");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
