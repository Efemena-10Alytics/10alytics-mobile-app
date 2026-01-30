import { Link as RouterLink } from "expo-router";
import { PressableScale as PresstoPressableScale } from "pressto";
import React from "react";
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
} from "react-native";
import Animated from "react-native-reanimated";
import {
  pressableConfig,
  triggerHaptic,
  type HapticType,
} from "./pressable-config";

type StripClassName<T> = Omit<T, "className" | "contentContainerClassName" | "contentClassName"> & {
  className?: string;
  contentContainerClassName?: string;
  contentClassName?: string;
};

// Re-export Link from expo-router (no className support)
export const Link = (props: React.ComponentProps<typeof RouterLink>) => {
  const { className: _cn, ...rest } = props as StripClassName<React.ComponentProps<typeof RouterLink>>;
  return <RouterLink {...rest} />;
};
Link.Trigger = RouterLink.Trigger;
Link.Menu = RouterLink.Menu;
Link.MenuAction = RouterLink.MenuAction;
Link.Preview = RouterLink.Preview;

// Placeholder for any useCSSVariable usages (e.g. web)
export const useCSSVariable =
  process.env.EXPO_OS !== "web"
    ? (_variable: string) => undefined
    : (variable: string) => `var(${variable})`;

// View – pass style, ignore className
export type ViewProps = StripClassName<React.ComponentProps<typeof RNView>>;
export const View = (props: ViewProps) => {
  const { className: _cn, ...rest } = props;
  return <RNView {...rest} />;
};
View.displayName = "View";

// Text
export type TextProps = StripClassName<React.ComponentProps<typeof RNText>>;
export const Text = (props: TextProps) => {
  const { className: _cn, ...rest } = props;
  return <RNText {...rest} />;
};
Text.displayName = "Text";

// ScrollView – pass style and contentContainerStyle, ignore className
export type ScrollViewProps = StripClassName<React.ComponentProps<typeof RNScrollView>>;
export const ScrollView = (props: ScrollViewProps) => {
  const {
    className: _cn,
    contentContainerClassName: _ccn,
    ...rest
  } = props;
  return <RNScrollView {...rest} />;
};
ScrollView.displayName = "ScrollView";

// Pressable
export type PressableProps = StripClassName<React.ComponentProps<typeof RNPressable>>;
export const Pressable = (props: PressableProps) => {
  const { className: _cn, ...rest } = props;
  return <RNPressable {...rest} />;
};
Pressable.displayName = "Pressable";

// TextInput
export type TextInputProps = StripClassName<React.ComponentProps<typeof RNTextInput>>;
export const TextInput = (props: TextInputProps) => {
  const { className: _cn, ...rest } = props;
  return <RNTextInput {...rest} />;
};
TextInput.displayName = "TextInput";

// AnimatedScrollView with native iOS defaults
export type AnimatedScrollViewProps = StripClassName<
  React.ComponentProps<typeof Animated.ScrollView>
>;
export const AnimatedScrollView = (props: AnimatedScrollViewProps) => {
  const {
    className: _cn,
    contentClassName: _contentCn,
    contentContainerClassName: _ccn,
    contentInsetAdjustmentBehavior,
    ...rest
  } = props;
  const behavior =
    Platform.OS === "ios" && contentInsetAdjustmentBehavior === undefined
      ? "automatic"
      : contentInsetAdjustmentBehavior;
  return (
    <Animated.ScrollView
      contentInsetAdjustmentBehavior={behavior}
      {...rest}
    />
  );
};
AnimatedScrollView.displayName = "AnimatedScrollView";

// TouchableHighlight
export const TouchableHighlight = (
  props: React.ComponentProps<typeof RNTouchableHighlight>
) => {
  const { className: _cn, ...rest } = props as StripClassName<React.ComponentProps<typeof RNTouchableHighlight>>;
  return <RNTouchableHighlight {...rest} />;
};
TouchableHighlight.displayName = "TouchableHighlight";

// PressableScale from pressto with haptics
export type PressableScaleProps = React.ComponentProps<typeof PresstoPressableScale> & {
  className?: string;
  hapticType?: HapticType;
  enableHaptics?: boolean;
};

export const PressableScale = ({
  hapticType = pressableConfig.defaultHapticType,
  enableHaptics = pressableConfig.enableHaptics,
  onPress,
  ...props
}: PressableScaleProps) => {
  const { className: _cn, ...rest } = props;
  const handlePress = (event: any) => {
    if (enableHaptics) {
      triggerHaptic(hapticType);
    }
    onPress?.(event);
  };
  return (
    <PresstoPressableScale {...rest} onPress={handlePress} />
  );
};
PressableScale.displayName = "PressableScale";

// TouchableOpacity
export const TouchableOpacity = (
  props: StripClassName<React.ComponentProps<typeof RNTouchableOpacity>>
) => {
  const { className: _cn, ...rest } = props;
  return <RNTouchableOpacity {...rest} />;
};
TouchableOpacity.displayName = "TouchableOpacity";

// KeyboardAvoidingView
export type KeyboardAvoidingViewProps = StripClassName<
  React.ComponentProps<typeof RNKeyboardAvoidingView>
>;
export const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
  const { className: _cn, ...rest } = props;
  return <RNKeyboardAvoidingView {...rest} />;
};
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

export { pressableConfig, triggerHaptic, type HapticType } from "./pressable-config";
