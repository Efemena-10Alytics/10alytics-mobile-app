import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView, Text, PressableScale, View } from "@/tw";
import { Animated } from "@/tw/animated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";


// const { width } = Dimensions.get("window");

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "React Native Workshop",
      time: "10:00 AM",
      date: "2026-01-25",
      location: "Online",
      type: "workshop",
      attendees: 45,
      color: colors.primary,
    },
    {
      id: 2,
      title: "Group Study Session",
      time: "2:00 PM",
      date: "2026-01-25",
      location: "Study Room A",
      type: "study",
      attendees: 12,
      color: "#4A90E2",
    },
    {
      id: 3,
      title: "Live Q&A with Instructor",
      time: "4:00 PM",
      date: "2026-01-26",
      location: "Online",
      type: "live",
      attendees: 120,
      color: "#9B59B6",
    },
    {
      id: 4,
      title: "Project Review",
      time: "11:00 AM",
      date: "2026-01-27",
      location: "Online",
      type: "review",
      attendees: 8,
      color: "#E74C3C",
    },
  ];

  const todayEvents = events.filter(
    (event) => event.date === currentDate.toISOString().split("T")[0]
  );

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case "workshop":
        return "📚";
      case "study":
        return "👥";
      case "live":
        return "🎥";
      case "review":
        return "📝";
      default:
        return "📅";
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-16 pb-6 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <View className="flex-row items-center justify-between mb-4">
              <PressableScale
                onPress={() =>
                  setCurrentDate(
                    new Date(currentDate.setDate(currentDate.getDate() - 1))
                  )
                }
              >
                <MaterialCommunityIcons name="chevron-left" size={24} color="#FFFFFF" />
              </PressableScale>
              <View className="items-center">
                <Text
                  className="text-2xl font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Text
                  className="text-base opacity-90"
                  style={{ color: "#FFFFFF" }}
                >
                  {currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
              <PressableScale
                onPress={() =>
                  setCurrentDate(
                    new Date(currentDate.setDate(currentDate.getDate() + 1))
                  )
                }
              >
                <MaterialCommunityIcons name="chevron-right" size={24} color="#FFFFFF" />
              </PressableScale>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <View className="px-6 mt-6">
            <Animated.View entering={FadeInRight.delay(200)}>
              <Text
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                Today&apos;s Events
              </Text>
              {todayEvents.map((event, index) => (
                <Animated.View
                  key={event.id}
                  entering={FadeInDown.delay(300 + index * 100)}
                >
                  <PressableScale
                    className="mb-4 rounded-2xl p-4"
                    style={{
                      backgroundColor: colors.background,
                      borderLeftWidth: 4,
                      borderLeftColor: event.color,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <View className="flex-row items-start">
                      <View
                        className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                        style={{ backgroundColor: `${event.color}20` }}
                      >
                        <Text className="text-2xl">{getEventIcon(event.type)}</Text>
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-lg font-bold mb-1"
                          style={{ color: colors.text }}
                        >
                          {event.title}
                        </Text>
                        <View className="flex-row items-center mb-2">
                          <MaterialCommunityIcons name="clock" size={14} color={colors.icon} />
                          <Text
                            className="text-sm ml-1"
                            style={{ color: colors.icon }}
                          >
                            {event.time}
                          </Text>
                        </View>
                        <View className="flex-row items-center mb-2">
                          <MaterialCommunityIcons name="map-marker" size={14} color={colors.icon} />
                          <Text
                            className="text-sm ml-1"
                            style={{ color: colors.icon }}
                          >
                            {event.location}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <MaterialCommunityIcons name="account-group" size={14} color={colors.icon} />
                          <Text
                            className="text-sm ml-1"
                            style={{ color: colors.icon }}
                          >
                            {event.attendees} attendees
                          </Text>
                        </View>
                      </View>
                    </View>
                  </PressableScale>
                </Animated.View>
              ))}
            </Animated.View>
          </View>
        )}

        {/* Upcoming Events */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(400)}>
            <Text
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Upcoming Events
            </Text>
            {upcomingEvents.map((event, index) => (
              <Animated.View
                key={event.id}
                entering={FadeInDown.delay(500 + index * 100)}
              >
                <PressableScale
                  className="mb-4 rounded-2xl p-4"
                  style={{
                    backgroundColor: colors.background,
                    borderLeftWidth: 4,
                    borderLeftColor: event.color,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <View className="flex-row items-start">
                    <View
                      className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: `${event.color}20` }}
                    >
                      <Text className="text-2xl">{getEventIcon(event.type)}</Text>
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-lg font-bold mb-1"
                        style={{ color: colors.text }}
                      >
                        {event.title}
                      </Text>
                      <Text
                        className="text-sm mb-2"
                        style={{ color: colors.icon }}
                      >
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                      <View className="flex-row items-center mb-2">
                        <MaterialCommunityIcons name="clock" size={14} color={colors.icon} />
                        <Text
                          className="text-sm ml-1"
                          style={{ color: colors.icon }}
                        >
                          {event.time}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <MaterialCommunityIcons name="map-marker" size={14} color={colors.icon} />
                        <Text
                          className="text-sm ml-1"
                          color={colors.icon}
                          style={{ color: colors.icon }}
                        >
                          {event.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </PressableScale>
              </Animated.View>
            ))}
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
