import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

import ENV from "../env";
import React from "react";

type MapPreviewProps = {
  location?: {
    lat: number;
    lng: number;
  };
  style?: ViewStyle;
  children?: React.ReactNode;
};
const MapPreview: React.FC<MapPreviewProps> = (props) => {
  let imagePreviewUrl: string | null = null;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
