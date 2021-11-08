import * as placesActions from "../store/places-action";

import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";

import CustomHeaderButton from "../components/CustomHeaderButton";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen: NavigationStackScreenComponent = (props) => {
  const places = useAppSelector((state) => state.places.places);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          place={itemData.item}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeId: itemData.item.id,
              placeTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Places"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navigationData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
