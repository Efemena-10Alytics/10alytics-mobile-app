import * as Haptics from "expo-haptics";

export type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error"
  | "selection"
  | null;

export interface PressableConfig {
  /**
   * Default haptic feedback type for PressableScale components
   * @default "light"
   */
  defaultHapticType: HapticType;
  /**
   * Whether haptics are enabled by default
   * @default true
   */
  enableHaptics: boolean;
}

/**
 * Default configuration for PressableScale components
 */
export const pressableConfig: PressableConfig = {
  defaultHapticType: "light",
  enableHaptics: true,
};

/**
 * Trigger haptic feedback based on type
 */
export const triggerHaptic = (type: HapticType) => {
  if (!type) return;

  switch (type) {
    case "light":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case "medium":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case "heavy":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case "success":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case "warning":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case "error":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case "selection":
      Haptics.selectionAsync();
      break;
  }
};
