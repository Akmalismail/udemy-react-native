import MapView, { MapEvent, Marker } from "react-native-maps";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Colors from "../constants/Colors";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const MapScreen: NavigationStackScreenComponent = (props) => {
  const [selectedLocation, setSelectedLocation] =
    useState<{ latitude: number; longitude: number }>();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0431,
  };

  const selectLocationHandler = (event: MapEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }

    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates: { latitude: number; longitude: number } | null = null;
  if (selectedLocation) {
    markerCoordinates = selectedLocation;
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navigationData) => {
  const saveFn = navigationData.navigation.getParam("saveLocation");

  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
