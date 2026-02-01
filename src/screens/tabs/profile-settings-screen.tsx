import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import React from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: GlassStyles.spacing.md,
        paddingBottom: GlassStyles.spacing.md,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        marginLeft: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        paddingHorizontal: GlassStyles.spacing.md,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1,
        opacity: 0.6,
        marginBottom: GlassStyles.spacing.md,
        marginTop: GlassStyles.spacing.lg,
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: GlassStyles.spacing.md,
    },
    settingLabelWrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: "600",
    },
    settingValue: {
        fontSize: 15,
        opacity: 0.6,
    },
    divider: {
        height: 1,
        opacity: 0.1,
    },
});

export function ProfileSettingsScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];
    const isDark = colorScheme === "dark";
    const insets = useSafeAreaInsets();

    const SettingRow = ({
        icon,
        label,
        value,
        color,
        isLast = false,
        type = "link"
    }: {
        iconName?: string,
        icon: string,
        label: string,
        value?: string,
        color: string,
        isLast?: boolean,
        type?: "link" | "switch"
    }) => (
        <View>
            <PressableScale
                style={styles.settingRow}
                onPress={type === "switch" ? undefined : () => { /* Handle link press */ }}
            >
                <View style={styles.settingLabelWrap}>
                    <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
                        <SymbolView name={icon as any} size={20} tintColor={color} type="hierarchical" />
                    </View>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
                </View>
                {type === "switch" ? (
                    <Switch
                        value={label === "Dark Mode" ? isDark : true}
                        trackColor={{ true: colors.primary }}
                        disabled={label === "Dark Mode"} // Currently follows system theme
                    />
                ) : (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {value && <Text style={[styles.settingValue, { color: colors.text, marginRight: 8 }]}>{value}</Text>}
                        <SymbolView name="chevron.right" size={14} tintColor={colors.textSecondary} />
                    </View>
                )}
            </PressableScale>
            {!isLast && <View style={[styles.divider, { backgroundColor: colors.text }]} />}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}>
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <PressableScale onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.glass.background }]}>
                    <SymbolView name="chevron.left" size={24} tintColor={colors.primary} />
                </PressableScale>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(100).springify()}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
                    <GlassCard animated={false} variant="light">
                        <SettingRow icon="person.fill" label="Personal Information" color={colors.primary} />
                        <SettingRow icon="envelope.fill" label="Email" value="david@10alytics.co" color="#4A90E2" />
                        <SettingRow icon="lock.fill" label="Security" isLast color="#27AE60" />
                    </GlassCard>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).springify()}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
                    <GlassCard animated={false} variant="light">
                        <SettingRow icon="bell.fill" label="Notifications" type="switch" color="#FF9F0A" />
                        <SettingRow icon="moon.fill" label="Dark Mode" type="switch" color="#9B59B6" />
                        <SettingRow icon="globe" label="Language" value="English" isLast color="#E74C3C" />
                    </GlassCard>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).springify()}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
                    <GlassCard animated={false} variant="light">
                        <SettingRow icon="questionmark.circle.fill" label="Help Center" color={colors.textSecondary} />
                        <SettingRow icon="hand.thumbsup.fill" label="Rate the App" color="#FFD700" />
                        <SettingRow icon="info.circle.fill" label="App Version" value="1.0.4" isLast color={colors.textSecondary} />
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
