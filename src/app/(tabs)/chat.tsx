import { KeyboardAvoidingView, PressableScale, ScrollView, Text, TextInput, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { SymbolView } from "expo-symbols";
import React, { useRef, useState } from "react";
import { Platform, PlatformColor } from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

export default function ChatScreen() {
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
      style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        {/* Groups List */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Animated.View entering={FadeInRight.delay(100)}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: PlatformColor("label"),
                }}
              >
                Study Groups
              </Text>
              <PressableScale>
                <SymbolView
                  name="magnifyingglass"
                  size={20}
                  tintColor={PlatformColor("label")}
                  type="hierarchical"
                />
              </PressableScale>
            </View>
          </Animated.View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 24, gap: 16 }}
          >
            {groups.map((group, index) => (
              <Animated.View
                key={group.id}
                entering={FadeInRight.delay(200 + index * 100)}
              >
                <PressableScale
                  style={{ alignItems: "center", width: 80 }}
                >
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      position: "relative",
                      backgroundColor: PlatformColor("secondarySystemBackground"),
                      borderCurve: "continuous",
                    }}
                  >
                    <Text style={{ fontSize: 32 }}>{group.avatar}</Text>
                    {group.unread > 0 && (
                      <View
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: PlatformColor("systemRed"),
                        }}
                      >
                        <Text
                          selectable
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: PlatformColor("label"),
                          }}
                        >
                          {group.unread}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    selectable
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "600",
                      color: PlatformColor("label"),
                    }}
                    numberOfLines={2}
                  >
                    {group.name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                    <SymbolView
                      name="person.2.fill"
                      size={10}
                      tintColor={PlatformColor("secondaryLabel")}
                      type="hierarchical"
                    />
                    <Text
                      selectable
                      style={{
                        fontSize: 12,
                        marginLeft: 4,
                        color: PlatformColor("secondaryLabel"),
                        fontVariant: ["tabular-nums"],
                      }}
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
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Animated.View entering={FadeInRight.delay(300)}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 16,
                color: PlatformColor("label"),
              }}
            >
              Recent Messages
            </Text>
          </Animated.View>

          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
          >
            {messages.map((msg, index) => (
              <Animated.View
                key={msg.id}
                entering={FadeInDown.delay(400 + index * 100)}
                style={{
                  marginBottom: 16,
                  alignItems: msg.isMe ? "flex-end" : "flex-start",
                }}
              >
                <View
                  style={{
                    maxWidth: "80%",
                    borderRadius: 16,
                    padding: 16,
                    backgroundColor: msg.isMe
                      ? PlatformColor("systemBlue")
                      : PlatformColor("secondarySystemBackground"),
                    borderCurve: "continuous",
                  }}
                >
                  {!msg.isMe && (
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                      <Text style={{ fontSize: 20, marginRight: 8 }}>{msg.avatar}</Text>
                      <Text
                        selectable
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: PlatformColor("label"),
                        }}
                      >
                        {msg.sender}
                      </Text>
                    </View>
                  )}
                  <Text
                    selectable
                    style={{
                      fontSize: 16,
                      color: msg.isMe ? PlatformColor("label") : PlatformColor("label"),
                    }}
                  >
                    {msg.message}
                  </Text>
                  <Text
                    selectable
                    style={{
                      fontSize: 12,
                      marginTop: 8,
                      color: msg.isMe
                        ? PlatformColor("secondaryLabel")
                        : PlatformColor("secondaryLabel"),
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
            entering={FadeInDown.delay(500)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 16,
                paddingHorizontal: 16,
                marginRight: 12,
                backgroundColor: PlatformColor("secondarySystemBackground"),
                borderWidth: 1,
                borderColor: PlatformColor("separator"),
                borderCurve: "continuous",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  fontSize: 16,
                  color: PlatformColor("label"),
                }}
                placeholder="Type a message..."
                placeholderTextColor={PlatformColor("placeholderText")}
                value={message}
                onChangeText={setMessage}
                multiline
              />
            </View>
            <PressableScale
              onPress={handleSend}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: PlatformColor("systemBlue"),
              }}
            >
              <SymbolView
                name="arrow.up.circle.fill"
                size={20}
                tintColor={PlatformColor("label")}
                type="hierarchical"
              />
            </PressableScale>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
