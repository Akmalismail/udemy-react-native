import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import ENV from "../env";
import React from "react";

type MapPreviewProps = {
  location?: {
    lat: number;
    lng: number;
  };
  style?: ViewStyle;
  children?: React.ReactNode;
  onPress?: () => void;
};
const MapPreview: React.FC<MapPreviewProps> = (props) => {
  let imagePreviewUrl: string | null = null;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV().googleApiKey}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
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
