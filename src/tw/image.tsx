import { Image as RNImage } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

type ImageStyle = React.ComponentProps<typeof RNImage>["style"] & {
  objectFit?: "contain" | "cover" | "fill" | "none";
  objectPosition?: string;
};

export type ImageProps = Omit<
  React.ComponentProps<typeof AnimatedExpoImage>,
  "style"
> & {
  style?: ImageStyle;
  className?: string;
};

export const Image = (props: ImageProps) => {
  const { className: _cn, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style) || {};
  const { objectFit, objectPosition, ...styleRest } = flattened as ImageStyle;

  return (
    <AnimatedExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...rest}
      source={
        typeof rest.source === "string" ? { uri: rest.source } : rest.source
      }
      style={styleRest}
    />
  );
};
Image.displayName = "Image";
