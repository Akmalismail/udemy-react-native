import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import { useAppSelector } from '../store/store';

const PlacesListScreen: NavigationStackScreenComponent = (props) => {
  const places = useAppSelector((state) => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={""}
          title={itemData.item.title}
          address={""}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", { place: itemData.item });
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
