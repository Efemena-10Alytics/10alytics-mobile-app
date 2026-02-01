import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS, Platform, useColorScheme } from "react-native";

function IOSTabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        color: DynamicColorIOS({
          dark: Colors.dark.text,
          light: Colors.light.text,
        }),
      }}
      tintColor={DynamicColorIOS({
        dark: Colors.dark.tint,
        light: Colors.light.tint,
      })}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf="square.grid.2x2" drawable="" />
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="courses">
        <Icon sf="book.closed" drawable="" />
        <Label>Courses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar">
        <Icon sf="calendar" drawable="" />
        <Label>Classes</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chat">
        <Icon sf="message" drawable="" />
        <Label>Chat</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person.circle" drawable="" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function AndroidTabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: isDark ? "rgba(21, 23, 24, 0.85)" : "rgba(255, 255, 255, 0.85)",
          borderTopWidth: 1,
          borderTopColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)",
          elevation: 0,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          height: 70,
          paddingBottom: 12,
          paddingTop: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerStyle: {
          backgroundColor: isDark ? colors.background : "#F5F0EB",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (Platform.OS === "ios") {
    return <IOSTabLayout />;
  }
  return <AndroidTabLayout />;
}
