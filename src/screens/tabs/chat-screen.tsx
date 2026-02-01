import { GlassCard } from "@/components/ui/GlassCard";
import { Colors, GlassStyles, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PressableScale, Text, TextInput, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: GlassStyles.spacing.lg,
    paddingBottom: GlassStyles.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: GlassStyles.spacing.md,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  newChatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    marginBottom: GlassStyles.spacing.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: GlassStyles.spacing.md,
    height: 48,
    borderRadius: GlassStyles.borderRadius.md,
    overflow: "hidden",
  },
  searchBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  searchInput: {
    flex: 1,
    marginLeft: GlassStyles.spacing.sm,
    fontSize: 17,
  },
  listContent: {
    paddingHorizontal: GlassStyles.spacing.md,
    paddingBottom: 120,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: GlassStyles.spacing.sm,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: GlassStyles.spacing.md,
    overflow: "hidden",
  },
  avatarBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  avatar: {
    fontSize: 28,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  groupName: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    marginRight: GlassStyles.spacing.sm,
  },
  time: {
    fontSize: 13,
    opacity: 0.6,
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 15,
    opacity: 0.7,
    flex: 1,
    marginRight: GlassStyles.spacing.sm,
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionHeader: {
    marginBottom: GlassStyles.spacing.md,
    marginTop: GlassStyles.spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.6,
  },
});

const GROUPS = [
  {
    id: "1",
    name: "React Native Study Group",
    lastMessage: "Alice: Has anyone tried the new architecture yet?",
    time: "10:30 AM",
    unread: 3,
    members: 24,
    avatar: "⚛️",
    color: "#61DAFB",
  },
  {
    id: "2",
    name: "Design Systems",
    lastMessage: "Bob: The new Figma updates are insane!",
    time: "Yesterday",
    unread: 0,
    members: 18,
    avatar: "🎨",
    color: "#FF2D55",
  },
  {
    id: "3",
    name: "Job Board & Career",
    lastMessage: "Sarah: Just posted a new senior role @ Spotify",
    time: "Tue",
    unread: 5,
    members: 156,
    avatar: "💼",
    color: "#30D158",
  },
  {
    id: "4",
    name: "TypeScript Wizards",
    lastMessage: "Mike: Can someone help with this generic type?",
    time: "Mon",
    unread: 1,
    members: 42,
    avatar: "📘",
    color: "#007AFF",
  },
  {
    id: "5",
    name: "Startup Weekend",
    lastMessage: "Dave: Pitch deck is ready for review.",
    time: "Sun",
    unread: 0,
    members: 8,
    avatar: "🚀",
    color: "#FF9F0A",
  },
  {
    id: "6",
    name: "Algorithm Practice",
    lastMessage: "LeetCode Daily: Dynamic Programming problem",
    time: "Last Week",
    unread: 0,
    members: 120,
    avatar: "🧠",
    color: "#BF5AF2",
  },
  {
    id: "7",
    name: "Off-Topic & Chill",
    lastMessage: "Tom: Anyone gaming tonight?",
    time: "Last Week",
    unread: 0,
    members: 30,
    avatar: "🎮",
    color: "#5E5CE6",
  },
];

export function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: typeof GROUPS[0]; index: number }) => (
    <Animated.View entering={FadeInRight.delay(100 + index * 50).springify()}>
      <GlassCard animated={false} variant="light" style={{ marginBottom: GlassStyles.spacing.sm }}>
        <PressableScale
          style={styles.chatItem}
          onPress={() => router.push({
            pathname: "/chat-room",
            params: { id: item.id, name: item.name }
          })}
        >
          <LinearGradient
            colors={[`${item.color}30`, `${item.color}15`] as const}
            style={styles.avatarContainer}
          >
            <BlurView
              intensity={GlassStyles.blur.light}
              tint={isDark ? "dark" : "light"}
              style={styles.avatarBlur}
            />
            <Text style={styles.avatar}>{item.avatar}</Text>
          </LinearGradient>
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text
                style={[styles.groupName, { color: colors.text }]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={[styles.time, { color: colors.textSecondary }]}>
                {item.time}
              </Text>
            </View>
            <View style={styles.chatFooter}>
              <Text
                style={[styles.lastMessage, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              {item.unread > 0 && (
                <LinearGradient
                  colors={Gradients.primary as any}
                  style={styles.unreadBadge}
                >
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </LinearGradient>
              )}
            </View>
          </View>
        </PressableScale>
      </GlassCard>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + GlassStyles.spacing.md }]}>
        <Animated.View entering={FadeInDown.delay(50).springify()}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Groups</Text>
            <GlassCard
              animated={false}
              variant="light"
              style={styles.newChatButton}
            >
              <PressableScale>
                <SymbolView
                  name="square.and.pencil"
                  size={22}
                  tintColor={colors.primary}
                />
              </PressableScale>
            </GlassCard>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={styles.searchContainer}>
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.glass.background,
                  borderWidth: 1,
                  borderColor: colors.glass.border,
                },
              ]}
            >
              <BlurView
                intensity={GlassStyles.blur.light}
                tint={isDark ? "dark" : "light"}
                style={styles.searchBlur}
              />
              <SymbolView
                name="magnifyingglass"
                size={18}
                tintColor={colors.textSecondary}
              />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search groups..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            {filteredGroups.length} Groups
          </Text>
        </View>
      </View>

      {/* Group List */}
      <FlatList
        data={filteredGroups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
