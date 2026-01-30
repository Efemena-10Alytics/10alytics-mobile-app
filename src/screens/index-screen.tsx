import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  gradientHeader: {
    paddingTop: 80,
    paddingBottom: 64,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerCenter: { alignItems: "center", marginBottom: 24 },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "black",
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 16,
    color: "black",
  },
  section: { paddingHorizontal: 24, marginTop: 32 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  featureList: { gap: 16 },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  featureIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: { flex: 1 },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  featureDesc: { fontSize: 14, opacity: 0.7 },
  ctaSection: { paddingHorizontal: 24, marginTop: 32, marginBottom: 32 },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerHint: { fontSize: 14, opacity: 0.7 },
  footerLink: { fontSize: 14, fontWeight: "600" },
});

export function IndexScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const features = [
    {
      icon: "book-open" as const,
      title: "Interactive Courses",
      description: "Learn at your own pace with engaging content",
      color: colors.primary,
    },
    {
      icon: "play-circle" as const,
      title: "Video Library",
      description: "Access thousands of educational videos",
      color: "#4A90E2",
    },
    {
      icon: "trophy" as const,
      title: "Achievements",
      description: "Earn badges and track your progress",
      color: "#9B59B6",
    },
    {
      icon: "chart-line" as const,
      title: "Track Progress",
      description: "Monitor your learning journey",
      color: "#E74C3C",
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`, `${colors.primary}AA`]}
          style={styles.gradientHeader}
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View style={styles.headerCenter}>
              <View
                style={[styles.iconCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}
              >
                <MaterialCommunityIcons name="book-open" size={64} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>Welcome to 10alytics</Text>
              <Text style={styles.subtitle}>
                Your journey to excellence starts here
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={styles.section}>
          <Animated.View entering={FadeInUp.delay(200)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Why Choose 10alytics?
            </Text>
          </Animated.View>

          <View style={styles.featureList}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                entering={FadeInRight.delay(300 + index * 100)}
              >
                <View
                  style={[
                    styles.featureRow,
                    {
                      backgroundColor: `${feature.color}10`,
                      borderWidth: 1,
                      borderColor: `${feature.color}30`,
                    },
                  ]}
                >
                  <View
                    style={[styles.featureIconBox, { backgroundColor: `${feature.color}20` }]}
                  >
                    <MaterialCommunityIcons name={feature.icon} size={28} color={feature.color} />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.featureDesc, { color: colors.text }]}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Animated.View entering={FadeInUp.delay(700)}>
            <PressableScale
              onPress={() => router.push("/sign-in")}
              style={[
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                },
              ]}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </PressableScale>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800)}>
            <PressableScale
              onPress={() => router.push("/create-account")}
              style={[styles.secondaryButton, { borderColor: colors.primary }]}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                Create Account
              </Text>
            </PressableScale>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(900)} style={styles.footerRow}>
            <Text style={[styles.footerHint, { color: colors.icon }]}>
              Already have an account?{" "}
            </Text>
            <PressableScale onPress={() => router.push("/sign-in")}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
