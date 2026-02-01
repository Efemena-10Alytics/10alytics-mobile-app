import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, ScrollView, Text, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingTop: GlassStyles.spacing.md,
    paddingBottom: 120,
    gap: GlassStyles.spacing.lg,
  },
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: GlassStyles.spacing.md,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  dateCenter: {
    alignItems: "center",
  },
  dateMonth: {
    fontSize: 22,
    fontWeight: "700",
  },
  dateWeekday: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: GlassStyles.spacing.md,
  },
  eventCard: {
    marginBottom: GlassStyles.spacing.md,
  },
  eventContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  eventIconBox: {
    width: 52,
    height: 52,
    borderRadius: GlassStyles.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: GlassStyles.spacing.md,
  },
  eventIcon: {
    fontSize: 28,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  eventMetaText: {
    fontSize: 14,
    marginLeft: 6,
    opacity: 0.8,
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  attendeeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: GlassStyles.borderRadius.full,
    alignSelf: "flex-start",
  },
  attendeeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: GlassStyles.spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: GlassStyles.spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: GlassStyles.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
});

export function CalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
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
      color: "#DA6728",
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

  const navigateDate = (direction: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + direction);
      return next;
    });
  };

  const renderEventCard = (event: typeof events[0], index: number, isUpcoming = false) => (
    <Animated.View
      key={event.id}
      entering={FadeInDown.delay(isUpcoming ? 400 + index * 100 : 200 + index * 100).springify()}
    >
      <GlassCard
        animated={false}
        variant="light"
        borderAccent={event.color}
        style={styles.eventCard}
      >
        <View style={styles.eventContent}>
          <LinearGradient
            colors={[`${event.color}30`, `${event.color}15`]}
            style={styles.eventIconBox}
          >
            <Text style={styles.eventIcon}>{getEventIcon(event.type)}</Text>
          </LinearGradient>
          <View style={styles.eventDetails}>
            <Text style={[styles.eventTitle, { color: colors.text }]}>
              {event.title}
            </Text>
            {isUpcoming && (
              <Text style={[styles.eventDate, { color: colors.textSecondary }]}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            )}
            <View style={styles.eventMetaRow}>
              <SymbolView
                name="clock.fill"
                size={14}
                tintColor={colors.textSecondary}
                type="hierarchical"
              />
              <Text style={[styles.eventMetaText, { color: colors.textSecondary }]}>
                {event.time}
              </Text>
            </View>
            <View style={styles.eventMetaRow}>
              <SymbolView
                name="mappin.circle.fill"
                size={14}
                tintColor={colors.textSecondary}
                type="hierarchical"
              />
              <Text style={[styles.eventMetaText, { color: colors.textSecondary }]}>
                {event.location}
              </Text>
            </View>
            <View
              style={[
                styles.attendeeBadge,
                { backgroundColor: `${event.color}15` },
              ]}
            >
              <SymbolView
                name="person.2.fill"
                size={14}
                tintColor={event.color}
                type="hierarchical"
              />
              <Text style={[styles.attendeeBadgeText, { color: event.color }]}>
                {event.attendees} attending
              </Text>
            </View>
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Date Navigation */}
      <Animated.View entering={FadeInDown.delay(50).springify()}>
        <GlassCard animated={false} variant="light" showGradientBorder>
          <View style={styles.dateNavigation}>
            <PressableScale
              onPress={() => navigateDate(-1)}
              style={[styles.navButton, { backgroundColor: `${colors.primary}15` }]}
            >
              <SymbolView
                name="chevron.left"
                size={20}
                tintColor={colors.primary}
                type="hierarchical"
              />
            </PressableScale>
            <View style={styles.dateCenter}>
              <Text style={[styles.dateMonth, { color: colors.text }]}>
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text style={[styles.dateWeekday, { color: colors.textSecondary }]}>
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <PressableScale
              onPress={() => navigateDate(1)}
              style={[styles.navButton, { backgroundColor: `${colors.primary}15` }]}
            >
              <SymbolView
                name="chevron.right"
                size={20}
                tintColor={colors.primary}
                type="hierarchical"
              />
            </PressableScale>
          </View>
        </GlassCard>
      </Animated.View>

      {/* Today's Events */}
      <View>
        <Animated.View entering={FadeInRight.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Today's Events
          </Text>
        </Animated.View>
        {todayEvents.length > 0 ? (
          todayEvents.map((event, index) => renderEventCard(event, index))
        ) : (
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <GlassCard animated={false} variant="medium">
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📭</Text>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No Events Today
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                  Enjoy your free day or explore upcoming events
                </Text>
              </View>
            </GlassCard>
          </Animated.View>
        )}
      </View>

      {/* Upcoming Events */}
      <View>
        <Animated.View entering={FadeInRight.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Upcoming Events
          </Text>
        </Animated.View>
        {upcomingEvents.map((event, index) => renderEventCard(event, index, true))}
      </View>
    </ScrollView>
  );
}
