import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { PlatformColor } from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";


// const { width } = Dimensions.get("window");

export function CalendarScreen() {
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
      color: PlatformColor("systemBlue"),
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
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16, gap: 24 }}
    >
      {/* Date Navigation */}
      <Animated.View entering={FadeInDown.delay(100)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <PressableScale
            onPress={() =>
              setCurrentDate((prev) => {
                const next = new Date(prev);
                next.setDate(next.getDate() - 1);
                return next;
              })
            }
          >
            <SymbolView
              name="chevron.left"
              size={24}
              tintColor={PlatformColor("label")}
              type="hierarchical"
            />
          </PressableScale>
          <View style={{ alignItems: "center" }}>
            <Text
              selectable
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: PlatformColor("label"),
              }}
            >
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 16,
                color: PlatformColor("secondaryLabel"),
                marginTop: 4,
              }}
            >
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <PressableScale
            onPress={() =>
              setCurrentDate((prev) => {
                const next = new Date(prev);
                next.setDate(next.getDate() + 1);
                return next;
              })
            }
          >
            <SymbolView
              name="chevron.right"
              size={24}
              tintColor={PlatformColor("label")}
              type="hierarchical"
            />
          </PressableScale>
        </View>
      </Animated.View>

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <Animated.View entering={FadeInRight.delay(200)}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 16,
              color: PlatformColor("label"),
            }}
          >
            Today&apos;s Events
          </Text>
          {todayEvents.map((event, index) => (
            <Animated.View
              key={event.id}
              entering={FadeInDown.delay(300 + index * 100)}
            >
              <PressableScale
                style={{
                  marginBottom: 16,
                  borderRadius: 16,
                  padding: 16,
                  backgroundColor: PlatformColor("secondarySystemBackground"),
                  borderLeftWidth: 4,
                  borderLeftColor: event.color,
                  borderCurve: "continuous",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16,
                      backgroundColor: `${String(event.color)}20`,
                      borderCurve: "continuous",
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{getEventIcon(event.type)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      selectable
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginBottom: 4,
                        color: PlatformColor("label"),
                      }}
                    >
                      {event.title}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                      <SymbolView
                        name="clock.fill"
                        size={14}
                        tintColor={PlatformColor("secondaryLabel")}
                        type="hierarchical"
                      />
                      <Text
                        selectable
                        style={{
                          fontSize: 14,
                          marginLeft: 4,
                          color: PlatformColor("secondaryLabel"),
                        }}
                      >
                        {event.time}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                      <SymbolView
                        name="mappin.circle.fill"
                        size={14}
                        tintColor={PlatformColor("secondaryLabel")}
                        type="hierarchical"
                      />
                      <Text
                        selectable
                        style={{
                          fontSize: 14,
                          marginLeft: 4,
                          color: PlatformColor("secondaryLabel"),
                        }}
                      >
                        {event.location}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <SymbolView
                        name="person.2.fill"
                        size={14}
                        tintColor={PlatformColor("secondaryLabel")}
                        type="hierarchical"
                      />
                      <Text
                        selectable
                        style={{
                          fontSize: 14,
                          marginLeft: 4,
                          color: PlatformColor("secondaryLabel"),
                          fontVariant: ["tabular-nums"],
                        }}
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
      )}

      {/* Upcoming Events */}
      <Animated.View entering={FadeInRight.delay(400)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 16,
            color: PlatformColor("label"),
          }}
        >
          Upcoming Events
        </Text>
        {upcomingEvents.map((event, index) => (
          <Animated.View
            key={event.id}
            entering={FadeInDown.delay(500 + index * 100)}
          >
            <PressableScale
              style={{
                marginBottom: 16,
                borderRadius: 16,
                padding: 16,
                backgroundColor: PlatformColor("secondarySystemBackground"),
                borderLeftWidth: 4,
                borderLeftColor: event.color,
                borderCurve: "continuous",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                    backgroundColor: `${String(event.color)}20`,
                    borderCurve: "continuous",
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{getEventIcon(event.type)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    selectable
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      marginBottom: 4,
                      color: PlatformColor("label"),
                    }}
                  >
                    {event.title}
                  </Text>
                  <Text
                    selectable
                    style={{
                      fontSize: 14,
                      marginBottom: 8,
                      color: PlatformColor("secondaryLabel"),
                    }}
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <SymbolView
                      name="clock.fill"
                      size={14}
                      tintColor={PlatformColor("secondaryLabel")}
                      type="hierarchical"
                    />
                    <Text
                      selectable
                      style={{
                        fontSize: 14,
                        marginLeft: 4,
                        color: PlatformColor("secondaryLabel"),
                      }}
                    >
                      {event.time}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SymbolView
                      name="mappin.circle.fill"
                      size={14}
                      tintColor={PlatformColor("secondaryLabel")}
                      type="hierarchical"
                    />
                    <Text
                      selectable
                      style={{
                        fontSize: 14,
                        marginLeft: 4,
                        color: PlatformColor("secondaryLabel"),
                      }}
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
    </ScrollView>
  );
}
