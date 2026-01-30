import React from "react";
import {
  ScrollView as RNScrollView,
  Text as RNText,
  View as RNView,
} from "react-native";
import RNAnimated from "react-native-reanimated";
import { PressableScale } from "./index";

export const Animated = {
  ...RNAnimated,
  View: RNAnimated.createAnimatedComponent(RNView),
  ScrollView: RNAnimated.createAnimatedComponent(RNScrollView),
  Text: RNAnimated.createAnimatedComponent(RNText),
  PressableScale: RNAnimated.createAnimatedComponent(
    PressableScale as React.ComponentType<any>
  ),
};
