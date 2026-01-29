import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView, Text, PressableScale, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import {
  Award,
  BookOpen,
  Clock,
  LogOut,
  Settings,
  Star,
  Target,
  Trophy,
  User,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { logOut, user } = useAuthStore();

  const stats = [
    { label: "Courses", value: "12", icon: BookOpen, color: colors.primary },
    { label: "Hours", value: "156", icon: Clock, color: "#4A90E2" },
    { label: "Achievements", value: "8", icon: Trophy, color: "#9B59B6" },
    { label: "Streak", value: "15", icon: Star, color: "#E74C3C" },
  ];

  const menuItems = [
    {
      id: 1,
      title: "My Courses",
      icon: BookOpen,
      color: colors.primary,
      onPress: () => { },
    },
    {
      id: 2,
      title: "Achievements",
      icon: Award,
      color: "#9B59B6",
      onPress: () => { },
    },
    {
      id: 3,
      title: "Learning Goals",
      icon: Target,
      color: "#4A90E2",
      onPress: () => { },
    },
    {
      id: 4,
      title: "Settings",
      icon: Settings,
      color: colors.icon,
      onPress: () => { },
    },
  ];

  const handleSignOut = async () => {
    await logOut();
    router.replace("/sign-in");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
      >
        {/* Header with Profile */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-16 pb-8 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View className="items-center mb-6">
              <View
                className="w-24 h-24 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <User size={48} color="#FFFFFF" />
              </View>
              <Text
                className="text-2xl font-bold mb-1"
                style={{ color: "#FFFFFF" }}
              >
                {user?.name || "Student"}
              </Text>
              <Text
                className="text-base opacity-90"
                style={{ color: "#FFFFFF" }}
              >
                {user?.email || "student@example.com"}
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Stats Grid */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(200)}>
            <View className="flex-row flex-wrap justify-between">
              {stats.map((stat, index) => (
                <Animated.View
                  key={stat.label}
                  entering={FadeInDown.delay(300 + index * 100)}
                >
                  <View
                    className="w-[48%] rounded-2xl p-4 mb-4"
                    style={{
                      backgroundColor: colors.background,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <View
                      className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon size={24} color={stat.color} />
                    </View>
                    <Text
                      className="text-2xl font-bold mb-1"
                      style={{ color: colors.text }}
                    >
                      {stat.value}
                    </Text>
                    <Text
                      className="text-sm"
                      style={{ color: colors.icon }}
                    >
                      {stat.label}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(500)}>
            <Text
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Menu
            </Text>
            {menuItems.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(600 + index * 100)}
              >
                <PressableScale
                  onPress={item.onPress}
                  className="flex-row items-center p-4 rounded-2xl mb-3"
                  style={{
                    backgroundColor: colors.background,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={24} color={item.color} />
                  </View>
                  <Text
                    className="text-base font-semibold flex-1"
                    style={{ color: colors.text }}
                  >
                    {item.title}
                  </Text>
                </PressableScale>
              </Animated.View>
            ))}
          </Animated.View>
        </View>

        {/* Sign Out Button */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInDown.delay(1000)}>
            <PressableScale
              onPress={handleSignOut}
              className="flex-row items-center justify-center p-4 rounded-2xl"
              style={{
                backgroundColor: "#E74C3C",
              }}
            >
              <LogOut size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text className="text-base font-semibold text-white">
                Sign Out
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
