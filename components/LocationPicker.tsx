import * as Location from "expo-location";

import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] =
    useState<{ lat: number; lng: number }>();

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== Location.PermissionStatus.GRANTED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant foreground permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet.</Text>
        )}
      </MapPreview>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
