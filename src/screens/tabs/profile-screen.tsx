import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { FadeInDown, FadeInRight, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingTop: GlassStyles.spacing.md,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: GlassStyles.spacing.xl,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: GlassStyles.spacing.md,
    overflow: "hidden",
  },
  avatarBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarGlow: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    opacity: 0.3,
  },
  userName: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GlassStyles.spacing.md,
    marginBottom: GlassStyles.spacing.lg,
  },
  statCard: {
    width: (width - GlassStyles.spacing.md * 3) / 2,
  },
  statCardContent: {
    alignItems: "center",
    paddingVertical: GlassStyles.spacing.md,
  },
  statIconBox: {
    width: 52,
    height: 52,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: GlassStyles.spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: GlassStyles.spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: GlassStyles.spacing.sm,
  },
  menuIconBox: {
    width: 48,
    height: 48,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: GlassStyles.spacing.md,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  signOutButton: {
    marginTop: GlassStyles.spacing.lg,
    overflow: "hidden",
    borderRadius: GlassStyles.borderRadius.lg,
  },
  signOutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: GlassStyles.spacing.md,
    paddingHorizontal: GlassStyles.spacing.lg,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: GlassStyles.spacing.sm,
  },
});

export function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { logOut, user } = useAuthStore();

  const stats = [
    { label: "Courses", value: "12", icon: "book.closed.fill" as const, color: colors.primary },
    { label: "Hours", value: "156", icon: "clock.fill" as const, color: "#4A90E2" },
    { label: "Achievements", value: "8", icon: "trophy.fill" as const, color: "#9B59B6" },
    { label: "Streak", value: "15", icon: "flame.fill" as const, color: "#E74C3C" },
  ];

  const menuItems = [
    {
      id: 1,
      title: "My Courses",
      icon: "book.closed.fill" as const,
      color: colors.primary,
      onPress: () => { },
    },
    {
      id: 2,
      title: "Achievements",
      icon: "trophy.fill" as const,
      color: "#9B59B6",
      onPress: () => { },
    },
    {
      id: 3,
      title: "Learning Goals",
      icon: "target" as const,
      color: "#4A90E2",
      onPress: () => { },
    },
    {
      id: 4,
      title: "Notifications",
      icon: "bell.fill" as const,
      color: "#FF9F0A",
      onPress: () => { },
    },
    {
      id: 5,
      title: "Settings",
      icon: "gearshape.fill" as const,
      color: colors.textSecondary,
      onPress: () => { },
    },
  ];

  const handleSignOut = async () => {
    await logOut();
    router.replace("/sign-in");
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + GlassStyles.spacing.lg }]}
    >
      {/* Profile Header */}
      <Animated.View entering={FadeInDown.delay(50).springify()}>
        <View style={styles.profileHeader}>
          <View>
            <LinearGradient
              colors={Gradients.primary}
              style={styles.avatarGlow}
            />
            <GlassCard
              animated={false}
              variant="light"
              showGradientBorder
              style={styles.avatarContainer}
            >
              <BlurView
                intensity={GlassStyles.blur.light}
                tint={isDark ? "dark" : "light"}
                style={styles.avatarBlur}
              />
              <SymbolView
                name="person.circle.fill"
                size={56}
                tintColor={colors.primary}
                type="hierarchical"
              />
            </GlassCard>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || "David Adokuru"}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email || "david@10alytics.co"}
          </Text>
        </View>
      </Animated.View>

      {/* Stats Grid */}
      <Animated.View entering={FadeInUp.delay(100).springify()}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay(200 + index * 100).springify()}
            >
              <GlassCard
                animated={false}
                variant="light"
                style={styles.statCard}
                showGradientBorder
              >
                <View style={styles.statCardContent}>
                  <LinearGradient
                    colors={[`${stat.color}30`, `${stat.color}15`]}
                    style={styles.statIconBox}
                  >
                    <SymbolView
                      name={stat.icon}
                      size={24}
                      tintColor={stat.color}
                      type="hierarchical"
                    />
                  </LinearGradient>
                  <Text style={[styles.statValue, { color: stat.color }]}>
                    {stat.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    {stat.label}
                  </Text>
                </View>
              </GlassCard>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* Menu Items */}
      <Animated.View entering={FadeInRight.delay(400).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        {menuItems.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(500 + index * 80).springify()}
          >
            <GlassCard animated={false} variant="light" style={{ marginBottom: GlassStyles.spacing.sm }}>
              <PressableScale onPress={item.onPress} style={styles.menuItem}>
                <LinearGradient
                  colors={[`${item.color}25`, `${item.color}10`]}
                  style={styles.menuIconBox}
                >
                  <SymbolView
                    name={item.icon}
                    size={22}
                    tintColor={item.color}
                    type="hierarchical"
                  />
                </LinearGradient>
                <Text style={[styles.menuTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <SymbolView
                  name="chevron.right"
                  size={14}
                  tintColor={colors.textSecondary}
                  type="hierarchical"
                />
              </PressableScale>
            </GlassCard>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Sign Out Button */}
      <Animated.View entering={FadeInUp.delay(800).springify()}>
        <PressableScale onPress={handleSignOut} style={styles.signOutButton}>
          <LinearGradient
            colors={["#E74C3C", "#C0392B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: GlassStyles.borderRadius.lg,
              ...GlassStyles.shadow.medium,
            }}
          >
            <View style={styles.signOutContent}>
              <SymbolView
                name="rectangle.portrait.and.arrow.right"
                size={20}
                tintColor="#fff"
                type="hierarchical"
              />
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </LinearGradient>
        </PressableScale>
      </Animated.View>
    </ScrollView>
  );
}
