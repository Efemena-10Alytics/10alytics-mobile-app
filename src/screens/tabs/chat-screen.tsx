import { PressableScale, Text, TextInput, View } from "@/tw";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import { FlatList, PlatformColor, StyleSheet } from "react-native";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof GROUPS[0] }) => (
    <PressableScale style={styles.chatItem}>
      <View style={[styles.avatarContainer, { backgroundColor: item.color + "20" }]}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.groupName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </PressableScale>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups</Text>
        <PressableScale style={styles.newChatButton}>
          <SymbolView
            name="square.and.pencil"
            size={22}
            tintColor={PlatformColor("systemBlue")}
          />
        </PressableScale>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SymbolView
            name="magnifyingglass"
            size={18}
            tintColor={PlatformColor("secondaryLabel")}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups..."
            placeholderTextColor={PlatformColor("secondaryLabel")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Group List */}
      <FlatList
        data={filteredGroups}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlatformColor("systemGroupedBackground"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: PlatformColor("label"),
  },
  newChatButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: PlatformColor("secondarySystemBackground"),
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PlatformColor("secondarySystemGroupedBackground"),
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 17,
    color: PlatformColor("label"),
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for tab bar
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: PlatformColor("separator"),
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  groupName: {
    fontSize: 17,
    fontWeight: "600",
    color: PlatformColor("label"),
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 14,
    color: PlatformColor("secondaryLabel"),
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 15,
    color: PlatformColor("secondaryLabel"),
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
