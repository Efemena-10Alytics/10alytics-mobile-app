import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { KeyboardAvoidingView, ScrollView, Text, TextInput, PressableScale, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { Search, Send, Users } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const groups = [
    {
      id: 1,
      name: "React Native Study Group",
      lastMessage: "Great session today!",
      time: "2:30 PM",
      unread: 3,
      members: 24,
      avatar: "👥",
    },
    {
      id: 2,
      name: "TypeScript Learners",
      lastMessage: "Anyone available for a quick review?",
      time: "1:15 PM",
      unread: 0,
      members: 18,
      avatar: "💬",
    },
    {
      id: 3,
      name: "Design Discussion",
      lastMessage: "Check out this new design pattern",
      time: "12:45 PM",
      unread: 1,
      members: 32,
      avatar: "🎨",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      message: "Hey everyone! Ready for today's session?",
      time: "10:00 AM",
      isMe: false,
      avatar: "👤",
    },
    {
      id: 2,
      sender: "You",
      message: "Yes! I've been reviewing the materials",
      time: "10:02 AM",
      isMe: true,
      avatar: "😊",
    },
    {
      id: 3,
      sender: "Jane Smith",
      message: "Same here! Excited to learn more",
      time: "10:03 AM",
      isMe: false,
      avatar: "🌟",
    },
    {
      id: 4,
      sender: "You",
      message: "Let's make this session productive!",
      time: "10:05 AM",
      isMe: true,
      avatar: "🚀",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("");
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-1">
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-16 pb-6 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              className="text-3xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Group Chat
            </Text>
            <Text className="text-base opacity-90" style={{ color: "#FFFFFF" }}>
              Connect with your learning community
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Groups List */}
        <View className="px-6 mt-6">
          <Animated.View entering={FadeInRight.delay(200)}>
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                Study Groups
              </Text>
              <PressableScale>
                <Search size={20} color={colors.icon} />
              </PressableScale>
            </View>
          </Animated.View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {groups.map((group, index) => (
              <Animated.View
                key={group.id}
                entering={FadeInRight.delay(300 + index * 100)}
              >
                <PressableScale
                  className="items-center mr-4"
                  style={{ width: 80 }}
                >
                  <View
                    className="w-16 h-16 rounded-2xl items-center justify-center mb-2 relative"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Text className="text-3xl">{group.avatar}</Text>
                    {group.unread > 0 && (
                      <View
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Text className="text-xs font-bold text-white">
                          {group.unread}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    className="text-xs text-center font-semibold"
                    style={{ color: colors.text }}
                    numberOfLines={2}
                  >
                    {group.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Users size={10} color={colors.icon} />
                    <Text
                      className="text-xs ml-1"
                      style={{ color: colors.icon }}
                    >
                      {group.members}
                    </Text>
                  </View>
                </PressableScale>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Messages */}
        <View className="flex-1 px-6">
          <Animated.View entering={FadeInRight.delay(400)}>
            <Text
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Recent Messages
            </Text>
          </Animated.View>

          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg, index) => (
              <Animated.View
                key={msg.id}
                entering={FadeInDown.delay(500 + index * 100)}
                className={`mb-4 ${msg.isMe ? "items-end" : "items-start"}`}
              >
                <View
                  className="max-w-[80%] rounded-2xl p-4"
                  style={{
                    backgroundColor: msg.isMe
                      ? colors.primary
                      : `${colors.primary}15`,
                  }}
                >
                  {!msg.isMe && (
                    <View className="flex-row items-center mb-2">
                      <Text className="text-2xl mr-2">{msg.avatar}</Text>
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        {msg.sender}
                      </Text>
                    </View>
                  )}
                  <Text
                    className="text-base"
                    style={{
                      color: msg.isMe ? "#FFFFFF" : colors.text,
                    }}
                  >
                    {msg.message}
                  </Text>
                  <Text
                    className="text-xs mt-2"
                    style={{
                      color: msg.isMe ? "rgba(255,255,255,0.7)" : colors.icon,
                    }}
                  >
                    {msg.time}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>

          {/* Message Input */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="flex-row items-center py-4"
          >
            <View
              className="flex-1 flex-row items-center rounded-2xl px-4 mr-3"
              style={{
                backgroundColor: `${colors.primary}10`,
                borderWidth: 1,
                borderColor: `${colors.primary}30`,
              }}
            >
              <TextInput
                className="flex-1 py-3 text-base"
                style={{ color: colors.text }}
                placeholder="Type a message..."
                placeholderTextColor={colors.icon}
                value={message}
                onChangeText={setMessage}
                multiline
              />
            </View>
            <PressableScale
              onPress={handleSend}
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Send size={20} color="#FFFFFF" />
            </PressableScale>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
