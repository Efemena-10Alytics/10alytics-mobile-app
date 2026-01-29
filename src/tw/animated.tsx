import RNAnimated from "react-native-reanimated";
import * as TW from "./index";

export const Animated = {
  ...RNAnimated,
  View: RNAnimated.createAnimatedComponent(TW.View),
  ScrollView: RNAnimated.createAnimatedComponent(TW.ScrollView),
  Text: RNAnimated.createAnimatedComponent(TW.Text),
  PressableScale: RNAnimated.createAnimatedComponent(TW.PressableScale),
};
