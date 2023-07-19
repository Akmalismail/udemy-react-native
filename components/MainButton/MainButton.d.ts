// This file exists for two purposes:
// 1. Ensure that both ios and android files present identical types to importers.
import DefaultAndroid, * as android from './MainButton.android';
// 2. Allow consumers to import the module as if typescript understood react-native suffixes.
import DefaultIos, * as ios from './MainButton.ios';

export interface MainButtonProps {
  children: JSX.Element | string;
  onPress: (event: GestureResponderEvent) => void;
  style?: {
    button?: ViewStyle;
    buttonText?: TextStyle;
  };
}

declare var _test: typeof ios;
declare var _test: typeof android;

declare var _testDefault: typeof DefaultIos;
declare var _testDefault: typeof DefaultAndroid;

export * from "./MainButton.ios";
export default DefaultIos;
