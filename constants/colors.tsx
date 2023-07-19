import { ColorValue, Platform, PlatformColor } from 'react-native';

const Colors = {
  primary: "#f7287b",
  accent: "#c717fc",
  //   ...Platform.select<{
  //     primary: ColorValue | undefined;
  //     accent: ColorValue | undefined;
  //   }>({
  //     ios: {
  //       primary: PlatformColor("label"),
  //       accent: PlatformColor("systemTealColor"),
  //     },
  //     android: {
  //       primary: PlatformColor("?android:attr/colorPrimaryDark"),
  //       accent: PlatformColor("@android:color/holo_blue_bright"),
  //     },
  //     default: { primary: "#f7287b", accent: "#c717fc" },
  //   }),
};

export default Colors;
