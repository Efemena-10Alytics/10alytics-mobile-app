import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "heading";
  bold?: boolean;
  color?: "primary" | "secondary" | "tertiary";
  center?: boolean;
};

const styles = StyleSheet.create({
  small: { fontSize: 14, marginBottom: 8 },
  medium: { fontSize: 16, marginBottom: 12 },
  large: { fontSize: 18, marginBottom: 16 },
  heading: { fontSize: 20, marginBottom: 20 },
  bold: { fontWeight: "700" },
  primary: { color: "#000" },
  secondary: { color: "#6b7280" },
  tertiary: { color: "#9ca3af" },
  center: { textAlign: "center" as const },
});

export function AppText({
  children,
  size = "medium",
  bold = false,
  color = "primary",
  center = false,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[
        size === "small" && styles.small,
        size === "medium" && styles.medium,
        size === "large" && styles.large,
        size === "heading" && styles.heading,
        bold && styles.bold,
        color === "primary" && styles.primary,
        color === "secondary" && styles.secondary,
        color === "tertiary" && styles.tertiary,
        center && styles.center,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
