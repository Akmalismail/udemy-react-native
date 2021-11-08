import MapView, { MapEvent, Marker } from "react-native-maps";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const MapScreen = () => {
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

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
