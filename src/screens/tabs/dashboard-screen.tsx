import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { SymbolView } from "expo-symbols";
import React from "react";
import { PlatformColor } from "react-native";
import { FadeInDown, FadeInRight } from "react-native-reanimated";

export function DashboardScreen() {
  const enrolledProgress = 75;
  const lastLesson = { title: "State Management with Zustand", course: "React Native Fundamentals" };
  const announcements = [
    { id: "1", title: "New course: Advanced TypeScript", time: "2h ago" },
    { id: "2", title: "Live Q&A tomorrow 4:00 PM", time: "1d ago" },
  ];
  const nextLiveClass = { title: "React Native Workshop", at: "Jan 30, 10:00 AM", link: "#" };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 24,
      }}
    >
      {/* Current progress */}
      <Animated.View entering={FadeInDown.delay(100)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 12,
            color: PlatformColor("label"),
          }}
        >
          Your Progress
        </Text>
        <View
          style={{
            borderRadius: 16,
            padding: 16,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderCurve: "continuous",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <View
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: PlatformColor("tertiarySystemFill"),
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: PlatformColor("systemBlue"),
                width: `${enrolledProgress}%`,
              }}
            />
          </View>
          <Text
            selectable
            style={{
              fontSize: 14,
              color: PlatformColor("secondaryLabel"),
              fontVariant: ["tabular-nums"],
            }}
          >
            {enrolledProgress}% complete • React Native Fundamentals
          </Text>
        </View>
      </Animated.View>

      {/* Resume last lesson */}
      <Animated.View entering={FadeInRight.delay(200)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 12,
            color: PlatformColor("label"),
          }}
        >
          Continue Learning
        </Text>
        <PressableScale
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderRadius: 16,
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
              backgroundColor: PlatformColor("systemBlue"),
              borderCurve: "continuous",
            }}
          >
            <SymbolView name="play.fill" size={24} tintColor="#FFFFFF" type="hierarchical" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: PlatformColor("label"),
              }}
              numberOfLines={1}
            >
              {lastLesson.title}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 14,
                color: PlatformColor("secondaryLabel"),
                marginTop: 4,
              }}
            >
              {lastLesson.course}
            </Text>
          </View>
          <SymbolView name="chevron.right" size={16} tintColor={PlatformColor("tertiaryLabel")} type="hierarchical" />
        </PressableScale>
      </Animated.View>

      {/* Latest announcements */}
      <Animated.View entering={FadeInRight.delay(300)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 12,
            color: PlatformColor("label"),
          }}
        >
          Announcements
        </Text>
        {announcements.map((item, index) => (
          <View
            key={item.id}
            style={{
              marginBottom: 12,
              padding: 16,
              borderRadius: 12,
              backgroundColor: PlatformColor("secondarySystemBackground"),
              borderCurve: "continuous",
            }}
          >
            <Text
              selectable
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: PlatformColor("label"),
              }}
            >
              {item.title}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 13,
                color: PlatformColor("tertiaryLabel"),
                marginTop: 4,
              }}
            >
              {item.time}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Upcoming live class */}
      <Animated.View entering={FadeInDown.delay(400)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 12,
            color: PlatformColor("label"),
          }}
        >
          Next Live Class
        </Text>
        <PressableScale
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderRadius: 16,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderLeftWidth: 4,
            borderLeftColor: PlatformColor("systemGreen"),
            borderCurve: "continuous",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SymbolView name="video.fill" size={28} tintColor={PlatformColor("systemGreen")} type="hierarchical" />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: PlatformColor("label"),
              }}
            >
              {nextLiveClass.title}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 14,
                color: PlatformColor("secondaryLabel"),
                marginTop: 4,
              }}
            >
              {nextLiveClass.at}
            </Text>
          </View>
          <SymbolView name="chevron.right" size={16} tintColor={PlatformColor("tertiaryLabel")} type="hierarchical" />
        </PressableScale>
      </Animated.View>
    </ScrollView>
  );
}
