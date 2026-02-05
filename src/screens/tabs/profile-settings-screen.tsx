import useThemeColors from "@/contexts/ThemeColors";
import { GlassStyles } from "@/constants/theme";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingBottom: GlassStyles.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: GlassStyles.spacing.sm,
    marginTop: GlassStyles.spacing.lg,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 14,
    opacity: 0.6,
  },
  divider: {
    height: 1,
    opacity: 0.08,
    marginLeft: 64,
  },
});

export function ProfileSettingsScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const SettingRow = ({
    icon,
    label,
    value,
    color,
    isLast = false,
    type = "link",
  }: {
    iconName?: string;
    icon: string;
    label: string;
    value?: string;
    color: string;
    isLast?: boolean;
    type?: "link" | "switch";
  }) => (
    <View>
      <PressableScale
        style={styles.row}
        onPress={type === "switch" ? undefined : () => { /* Handle link press */ }}
      >
        <View style={styles.rowLeft}
        >
          <LinearGradient colors={[`${color}35`, `${color}10`]} style={styles.iconBox}>
            <SymbolView name={icon as any} size={18} tintColor={color} type="hierarchical" />
          </LinearGradient>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            {value && <Text style={[styles.value, { color: colors.text }]}>{value}</Text>}
          </View>
        </View>
        {type === "switch" ? (
          <Switch
            value={label === "Dark Mode" ? colors.isDark : true}
            trackColor={{ true: colors.highlight }}
            disabled={label === "Dark Mode"}
          />
        ) : (
          <SymbolView name="chevron.right" size={14} tintColor={colors.icon} />
        )}
      </PressableScale>
      {!isLast && <View style={[styles.divider, { backgroundColor: colors.text }]} />}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerRow}>
          <PressableScale onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.secondary }]}
          >
            <SymbolView name="chevron.left" size={22} tintColor={colors.icon} />
          </PressableScale>
          <View />
          <View />
        </View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.headerSubtitle, { color: colors.text }]}>Manage your preferences</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.card, { backgroundColor: colors.secondary }]}
          >
            <SettingRow icon="person.fill" label="Personal Information" color={colors.highlight} />
            <SettingRow icon="envelope.fill" label="Email" value="david@10alytics.co" color="#4A90E2" />
            <SettingRow icon="lock.fill" label="Security" isLast color="#27AE60" />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <View style={[styles.card, { backgroundColor: colors.secondary }]}
          >
            <SettingRow icon="bell.fill" label="Notifications" type="switch" color="#FF9F0A" />
            <SettingRow icon="moon.fill" label="Dark Mode" type="switch" color="#9B59B6" />
            <SettingRow icon="globe" label="Language" value="English" isLast color="#E74C3C" />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          <View style={[styles.card, { backgroundColor: colors.secondary }]}
          >
            <SettingRow icon="questionmark.circle.fill" label="Help Center" color={colors.textSecondary} />
            <SettingRow icon="hand.thumbsup.fill" label="Rate the App" color="#FFD700" />
            <SettingRow icon="info.circle.fill" label="App Version" value="1.0.4" isLast color={colors.textSecondary} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
