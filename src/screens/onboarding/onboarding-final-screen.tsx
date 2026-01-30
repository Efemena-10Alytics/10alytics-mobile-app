import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  gradientHeader: {
    paddingTop: 80,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerCenter: { alignItems: "center", marginBottom: 24 },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 16,
    color: "#FFFFFF",
  },
  benefitsSection: { paddingHorizontal: 24, marginTop: 32 },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  benefitsList: { gap: 12, marginBottom: 24 },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  benefitIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  benefitText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginTop: "auto",
    marginBottom: 32,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  skipWrap: { marginTop: 16 },
  skipButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  skipText: { fontSize: 16, fontWeight: "600" },
});

export function OnboardingFinalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { completeOnboarding } = useAuthStore();

  const handleComplete = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const benefits = [
    {
      icon: "rocket-launch",
      text: "Start learning immediately",
    },
    {
      icon: "trophy",
      text: "Earn achievements and badges",
    },
    {
      icon: "account-group",
      text: "Join study groups and communities",
    },
    {
      icon: "calendar-clock",
      text: "Schedule your learning sessions",
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`, `${colors.primary}AA`]}
          style={styles.gradientHeader}
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View style={styles.headerCenter}>
              <Animated.View
                entering={FadeIn.delay(200)}
                style={[styles.iconCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}
              >
                <MaterialCommunityIcons
                  name="check-circle"
                  size={72}
                  color="#FFFFFF"
                />
              </Animated.View>
              <Text style={styles.headerTitle}>
                You&apos;re All Set!
              </Text>
              <Text style={styles.headerSubtitle}>
                Ready to start your learning journey?
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Animated.View entering={FadeInUp.delay(300)}>
            <Text
              style={[styles.benefitsTitle, { color: colors.text }]}
            >
              Get Started Today
            </Text>
          </Animated.View>

          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => {
              return (
                <Animated.View
                  key={index}
                  entering={FadeInUp.delay(400 + index * 100)}
                >
                  <View
                    style={[
                      styles.benefitRow,
                      {
                        backgroundColor: `${colors.primary}10`,
                        borderWidth: 1,
                        borderColor: `${colors.primary}30`,
                      },
                    ]}
                  >
                    <View
                      style={[styles.benefitIconWrap, { backgroundColor: `${colors.primary}20` }]}
                    >
                      <MaterialCommunityIcons
                        name={benefit.icon as any}
                        size={24}
                        color={colors.primary}
                      />
                    </View>
                    <Text
                      style={[styles.benefitText, { color: colors.text }]}
                    >
                      {benefit.text}
                    </Text>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <Animated.View entering={FadeInUp.delay(800)}>
            <PressableScale
              onPress={handleComplete}
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
              <Text style={styles.primaryButtonText}>
                Start Learning
              </Text>
            </PressableScale>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(900)} style={styles.skipWrap}>
            <PressableScale
              onPress={handleComplete}
              style={styles.skipButton}
            >
              <Text
                style={[styles.skipText, { color: colors.icon }]}
              >
                Skip for now
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
