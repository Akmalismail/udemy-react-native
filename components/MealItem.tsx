import React from 'react';
import { ImageBackground, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import Meal from '../models/meal';

type MealItemProps = {
  item: Meal;
  onSelectMeal: () => void;
};
const MealItem: React.FC<MealItemProps> = (props) => {
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{
          borderless: true,
        }}
        style={({ pressed }) => [
          {
            ...{
              opacity: Platform.OS === "ios" && pressed ? 0.5 : 1.0,
            },
          },
        ]}
        onPress={props.onSelectMeal}
      >
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.item.imageUrl }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <Text>{props.item.duration}m</Text>
            <Text>{props.item.complexity.toUpperCase()}</Text>
            <Text>{props.item.affordability.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    height: 200,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    marginVertical: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
