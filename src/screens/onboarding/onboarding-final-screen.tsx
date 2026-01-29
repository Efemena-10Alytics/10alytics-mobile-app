import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`, `${colors.primary}AA`]}
          className="pt-20 pb-12 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View className="items-center mb-6">
              <Animated.View
                entering={FadeIn.delay(200)}
                className="w-32 h-32 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <MaterialCommunityIcons
                  name="check-circle"
                  size={72}
                  color="#FFFFFF"
                />
              </Animated.View>
              <Text
                className="text-4xl font-bold mb-3 text-center"
                style={{ color: "#FFFFFF" }}
              >
                You&apos;re All Set!
              </Text>
              <Text
                className="text-base opacity-90 text-center px-4"
                style={{ color: "#FFFFFF" }}
              >
                Ready to start your learning journey?
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Benefits Section */}
        <View className="px-6 mt-8">
          <Animated.View entering={FadeInUp.delay(300)}>
            <Text
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.text }}
            >
              Get Started Today
            </Text>
          </Animated.View>

          <View className="gap-3 mb-6">
            {benefits.map((benefit, index) => {
              return (
                <Animated.View
                  key={index}
                  entering={FadeInUp.delay(400 + index * 100)}
                >
                  <View
                    className="flex-row items-center p-4 rounded-2xl"
                    style={{
                      backgroundColor: `${colors.primary}10`,
                      borderWidth: 1,
                      borderColor: `${colors.primary}30`,
                    }}
                  >
                    <View
                      className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <MaterialCommunityIcons
                        name={benefit.icon as any}
                        size={24}
                        color={colors.primary}
                      />
                    </View>
                    <Text
                      className="text-base font-semibold flex-1"
                      style={{ color: colors.text }}
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
        <View className="px-6 mt-auto mb-8">
          <Animated.View entering={FadeInUp.delay(800)}>
            <PressableScale
              onPress={handleComplete}
              className="py-4 rounded-2xl items-center"
              style={{
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-lg font-bold text-white">
                Start Learning
              </Text>
            </PressableScale>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(900)}
            className="mt-4"
          >
            <PressableScale
              onPress={handleComplete}
              className="py-4 rounded-2xl items-center"
            >
              <Text
                className="text-base font-semibold"
                style={{ color: colors.icon }}
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
