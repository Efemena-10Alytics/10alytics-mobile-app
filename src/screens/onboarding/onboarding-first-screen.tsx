import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

export function OnboardingFirstScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const features = [
    {
      icon: "book-open-variant",
      title: "Learn Anytime",
      description: "Access courses and materials 24/7 from anywhere",
      color: colors.primary,
    },
    {
      icon: "video-library",
      title: "Video Lessons",
      description: "Watch high-quality video tutorials at your own pace",
      color: "#4A90E2",
    },
    {
      icon: "chart-line",
      title: "Track Progress",
      description: "Monitor your learning journey and achievements",
      color: "#9B59B6",
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
              <View
                className="w-28 h-28 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <MaterialCommunityIcons
                  name="school"
                  size={56}
                  color="#FFFFFF"
                />
              </View>
              <Text
                className="text-4xl font-bold mb-3 text-center"
                style={{ color: "#FFFFFF" }}
              >
                Welcome to 10alytics!
              </Text>
              <Text
                className="text-base opacity-90 text-center px-4"
                style={{ color: "#FFFFFF" }}
              >
                Your personalized learning platform is ready
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
              What You Can Do
            </Text>
          </Animated.View>

          <View className="gap-4 mb-6">
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
                      <MaterialCommunityIcons
                        name={feature.icon as any}
                        size={28}
                        color={feature.color}
                      />
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

        {/* CTA Button */}
        <View className="px-6 mt-auto mb-8">
          <Animated.View entering={FadeInUp.delay(600)}>
            <PressableScale
              onPress={() => router.push("/onboarding/final")}
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
              <Text className="text-lg font-bold text-white">Continue</Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
