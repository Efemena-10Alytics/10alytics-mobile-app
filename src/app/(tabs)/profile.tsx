import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { PlatformColor } from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

export default function ProfileScreen() {
  const { logOut, user } = useAuthStore();

  const stats = [
    { label: "Courses", value: "12", icon: "book.closed.fill", color: PlatformColor("systemBlue") },
    { label: "Hours", value: "156", icon: "clock.fill", color: "#4A90E2" },
    { label: "Achievements", value: "8", icon: "trophy.fill", color: "#9B59B6" },
    { label: "Streak", value: "15", icon: "flame.fill", color: "#E74C3C" },
  ];

  const menuItems = [
    {
      id: 1,
      title: "My Courses",
      icon: "book.closed.fill",
      color: PlatformColor("systemBlue"),
      onPress: () => { },
    },
    {
      id: 2,
      title: "Achievements",
      icon: "trophy.fill",
      color: "#9B59B6",
      onPress: () => { },
    },
    {
      id: 3,
      title: "Learning Goals",
      icon: "target",
      color: "#4A90E2",
      onPress: () => { },
    },
    {
      id: 4,
      title: "Settings",
      icon: "gearshape.fill",
      color: PlatformColor("secondaryLabel"),
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
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16, gap: 24 }}
    >
      {/* Profile Header */}
      <Animated.View entering={FadeInDown.delay(100)}>
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              backgroundColor: PlatformColor("secondarySystemBackground"),
            }}
          >
            <SymbolView
              name="person.circle.fill"
              size={48}
              tintColor={PlatformColor("secondaryLabel")}
              type="hierarchical"
            />
          </View>
          <Text
            selectable
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 4,
              color: PlatformColor("label"),
            }}
          >
            {user?.name || "Student"}
          </Text>
          <Text
            selectable
            style={{
              fontSize: 16,
              color: PlatformColor("secondaryLabel"),
            }}
          >
            {user?.email || "student@example.com"}
          </Text>
        </View>
      </Animated.View>

      {/* Stats Grid */}
      <Animated.View entering={FadeInRight.delay(200)}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay(300 + index * 100)}
              style={{ width: "48%" }}
            >
              <View
                style={{
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  backgroundColor: PlatformColor("secondarySystemBackground"),
                  borderCurve: "continuous",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    backgroundColor: `${stat.color}20`,
                    borderCurve: "continuous",
                  }}
                >
                  <SymbolView
                    name={stat.icon}
                    size={24}
                    tintColor={stat.color}
                    type="hierarchical"
                  />
                </View>
                <Text
                  selectable
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    marginBottom: 4,
                    color: PlatformColor("label"),
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 14,
                    color: PlatformColor("secondaryLabel"),
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* Menu Items */}
      <Animated.View entering={FadeInRight.delay(500)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 16,
            color: PlatformColor("label"),
          }}
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                backgroundColor: PlatformColor("secondarySystemBackground"),
                borderCurve: "continuous",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                  backgroundColor: `${item.color}20`,
                  borderCurve: "continuous",
                }}
              >
                <SymbolView
                  name={item.icon}
                  size={24}
                  tintColor={item.color}
                  type="hierarchical"
                />
              </View>
              <Text
                selectable
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                  color: PlatformColor("label"),
                }}
              >
                {item.title}
              </Text>
            </PressableScale>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Sign Out Button */}
      <Animated.View entering={FadeInDown.delay(1000)}>
        <PressableScale
          onPress={handleSignOut}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            borderRadius: 16,
            backgroundColor: PlatformColor("systemRed"),
            borderCurve: "continuous",
          }}
        >
          <SymbolView
            name="rectangle.portrait.and.arrow.right"
            size={20}
            tintColor={PlatformColor("label")}
            type="hierarchical"
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: PlatformColor("label"),
              marginLeft: 8,
            }}
          >
            Sign Out
          </Text>
        </PressableScale>
      </Animated.View>
    </ScrollView>
  );
}
