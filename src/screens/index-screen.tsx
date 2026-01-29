import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`, `${colors.primary}AA`]}
          className="pt-20 pb-16 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View className="items-center mb-6">
              <View
                className="w-32 h-32 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <MaterialCommunityIcons name="book-open" size={64} color="#FFFFFF" />
              </View>
              <Text
                className="text-5xl font-bold mb-3 text-center"
                style={{ color: "#FFFFFF" }}
              >
                Welcome to 10alytics
              </Text>
              <Text
                className="text-lg opacity-90 text-center px-4"
                style={{ color: "#FFFFFF" }}
              >
                Your journey to excellence starts here
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Features Section */}
        <View className="px-6 mt-8">
          <Animated.View entering={FadeInUp.delay(200)}>
            <Text
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.text }}
            >
              Why Choose 10alytics?
            </Text>
          </Animated.View>

          <View className="gap-4">
            {features.map((feature, index) => {
              return (
                <Animated.View
                  key={index}
                  entering={FadeInRight.delay(300 + index * 100)}
                >
                  <View
                    className="flex-row items-center p-4 rounded-2xl mb-2"
                    style={{
                      backgroundColor: `${feature.color}10`,
                      borderWidth: 1,
                      borderColor: `${feature.color}30`,
                    }}
                  >
                    <View
                      className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <MaterialCommunityIcons name={feature.icon} size={28} color={feature.color} />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-lg font-bold mb-1"
                        style={{ color: colors.text }}
                      >
                        {feature.title}
                      </Text>
                      <Text
                        className="text-sm opacity-70"
                        style={{ color: colors.text }}
                      >
                        {feature.description}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* CTA Buttons */}
        <View className="px-6 mt-8 mb-8">
          <Animated.View entering={FadeInUp.delay(700)}>
            <PressableScale
              onPress={() => router.push("/sign-in")}
              className="py-4 rounded-2xl items-center mb-4"
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
                Get Started
              </Text>
            </PressableScale>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800)}>
            <PressableScale
              onPress={() => router.push("/create-account")}
              className="py-4 rounded-2xl items-center border-2"
              style={{
                borderColor: colors.primary,
              }}
            >
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.primary }}
              >
                Create Account
              </Text>
            </PressableScale>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(900)}
            className="flex-row justify-center mt-6"
          >
            <Text
              className="text-sm opacity-70"
              style={{ color: colors.icon }}
            >
              Already have an account?&nbsp;
            </Text>
            <PressableScale onPress={() => router.push("/sign-in")}>
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Sign In
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
