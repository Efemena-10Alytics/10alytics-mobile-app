import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { LinearGradient } from "expo-linear-gradient";
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
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: GlassStyles.spacing.lg,
    borderBottomLeftRadius: GlassStyles.borderRadius.xl,
    borderBottomRightRadius: GlassStyles.borderRadius.xl,
  },
  headerContent: {
    marginBottom: GlassStyles.spacing.md,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingTop: GlassStyles.spacing.lg,
    paddingBottom: 120,
    gap: GlassStyles.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: GlassStyles.spacing.md,
  },
  progressCard: {
    padding: 0,
  },
  progressContent: {
    padding: GlassStyles.spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: GlassStyles.spacing.md,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: GlassStyles.spacing.sm,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  progressBarGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
  progressCourse: {
    fontSize: 14,
    opacity: 0.7,
  },
  continueCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueIconBox: {
    width: 56,
    height: 56,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: GlassStyles.spacing.md,
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  announcementItem: {
    marginBottom: GlassStyles.spacing.md,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  announcementTime: {
    fontSize: 13,
    opacity: 0.6,
  },
  liveClassCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveClassIconBox: {
    width: 56,
    height: 56,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: GlassStyles.spacing.md,
  },
  liveClassContent: {
    flex: 1,
  },
  liveClassTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  liveClassTime: {
    fontSize: 14,
    opacity: 0.7,
  },
  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: GlassStyles.borderRadius.full,
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: GlassStyles.spacing.md,
  },
  quickActionCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: GlassStyles.spacing.lg,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: GlassStyles.spacing.sm,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const enrolledProgress = 75;
  const lastLesson = {
    title: "State Management with Zustand",
    course: "React Native Fundamentals",
  };
  const announcements = [
    { id: "1", title: "New course: Advanced TypeScript", time: "2h ago" },
    { id: "2", title: "Live Q&A tomorrow 4:00 PM", time: "1d ago" },
  ];
  const nextLiveClass = {
    title: "React Native Workshop",
    at: "Jan 30, 10:00 AM",
    link: "#",
  };

  const quickActions = [
    { icon: "play.circle.fill" as const, label: "Continue", color: colors.primary },
    { icon: "calendar" as const, label: "Schedule", color: "#4A90E2" },
    { icon: "video.fill" as const, label: "Join Class", color: "#27AE60" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}>
      {/* Gradient Header */}
      <Animated.View entering={FadeInDown.delay(50).springify()}>
        <LinearGradient
          colors={Gradients.warmSunset}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.headerGradient, { paddingTop: insets.top + 20 }]}
        >
          <View style={styles.headerContent}>
            <Text style={[styles.welcomeText, { color: "rgba(255,255,255,0.9)" }]}>
              Welcome back
            </Text>
            <Text style={[styles.nameText, { color: "#fff" }]}>David 👋</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Card */}
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
          <GlassCard
            animated={false}
            variant="light"
            showGradientBorder
            style={styles.progressCard}
          >
            <View style={styles.progressContent}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>
                  React Native Fundamentals
                </Text>
                <Text style={[styles.progressValue, { color: colors.primary }]}>
                  {enrolledProgress}%
                </Text>
              </View>
              <View
                style={[
                  styles.progressBarContainer,
                  { backgroundColor: `${colors.primary}20` },
                ]}
              >
                <LinearGradient
                  colors={Gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBar, { width: `${enrolledProgress}%` }]}
                />
              </View>
              <Text style={[styles.progressCourse, { color: colors.textSecondary }]}>
                18 of 24 lessons completed
              </Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action, index) => (
              <GlassCard
                key={action.label}
                animated={false}
                variant="medium"
                style={styles.quickActionCard}
              >
                <PressableScale>
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: `${action.color}20` },
                    ]}
                  >
                    <SymbolView
                      name={action.icon}
                      size={24}
                      tintColor={action.color}
                      type="hierarchical"
                    />
                  </View>
                  <Text style={[styles.quickActionLabel, { color: colors.text }]}>
                    {action.label}
                  </Text>
                </PressableScale>
              </GlassCard>
            ))}
          </View>
        </Animated.View>

        {/* Continue Learning */}
        <Animated.View entering={FadeInRight.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Learning</Text>
          <GlassCard animated={false} variant="light">
            <PressableScale style={styles.continueCard}>
              <LinearGradient
                colors={Gradients.primary}
                style={styles.continueIconBox}
              >
                <SymbolView name="play.fill" size={24} tintColor="#fff" type="hierarchical" />
              </LinearGradient>
              <View style={styles.continueContent}>
                <Text
                  style={[styles.continueTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {lastLesson.title}
                </Text>
                <Text style={[styles.continueSubtitle, { color: colors.textSecondary }]}>
                  {lastLesson.course}
                </Text>
              </View>
              <SymbolView
                name="chevron.right"
                size={16}
                tintColor={colors.textSecondary}
                type="hierarchical"
              />
            </PressableScale>
          </GlassCard>
        </Animated.View>

        {/* Announcements */}
        <Animated.View entering={FadeInRight.delay(400).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Announcements</Text>
          {announcements.map((item, index) => (
            <GlassCard
              key={item.id}
              animated={false}
              variant="medium"
              style={styles.announcementItem}
            >
              <Text style={[styles.announcementTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.announcementTime, { color: colors.textSecondary }]}>
                {item.time}
              </Text>
            </GlassCard>
          ))}
        </Animated.View>

        {/* Next Live Class */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Next Live Class</Text>
          <GlassCard animated={false} variant="light" borderAccent="#27AE60">
            <PressableScale style={styles.liveClassCard}>
              <View
                style={[
                  styles.liveClassIconBox,
                  { backgroundColor: "rgba(39, 174, 96, 0.15)" },
                ]}
              >
                <SymbolView
                  name="video.fill"
                  size={28}
                  tintColor="#27AE60"
                  type="hierarchical"
                />
              </View>
              <View style={styles.liveClassContent}>
                <Text style={[styles.liveClassTitle, { color: colors.text }]}>
                  {nextLiveClass.title}
                </Text>
                <Text style={[styles.liveClassTime, { color: colors.textSecondary }]}>
                  {nextLiveClass.at}
                </Text>
              </View>
              <LinearGradient colors={["#27AE60", "#219A52"]} style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>LIVE</Text>
              </LinearGradient>
            </PressableScale>
          </GlassCard>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
