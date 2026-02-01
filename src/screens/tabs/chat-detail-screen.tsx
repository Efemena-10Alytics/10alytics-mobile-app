import { Colors, GlassStyles, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MESSAGES = [
    { id: "1", text: "Hey team! How is the new UI looking?", sender: "Alice", time: "10:30 AM", isMe: false, avatar: "👩‍💻" },
    { id: "2", text: "It's looking incredible! The glassmorphism is really premium.", sender: "Me", time: "10:32 AM", isMe: true },
    { id: "3", text: "Did we fix the blur intensity on Android?", sender: "Bob", time: "10:35 AM", isMe: false, avatar: "🧔" },
    { id: "4", text: "Yes, using expo-blur with proper tinting works well now.", sender: "Alice", time: "10:36 AM", isMe: false, avatar: "👩‍💻" },
    { id: "5", text: "Awesome! I'll start working on the Profile section now.", sender: "Me", time: "10:40 AM", isMe: true },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: GlassStyles.spacing.md,
        paddingBottom: GlassStyles.spacing.sm,
        borderBottomWidth: 1,
    },
    headerContent: {
        flex: 1,
        marginLeft: GlassStyles.spacing.sm,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
    },
    headerSubtitle: {
        fontSize: 13,
        opacity: 0.6,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    listContent: {
        padding: GlassStyles.spacing.md,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: "row",
        marginBottom: GlassStyles.spacing.md,
        maxWidth: "85%",
    },
    myMessageRow: {
        alignSelf: "flex-end",
    },
    otherMessageRow: {
        alignSelf: "flex-start",
    },
    avatarWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        marginTop: 4,
    },
    messageBubble: {
        borderRadius: GlassStyles.borderRadius.md,
        padding: GlassStyles.spacing.md,
        borderWidth: 1,
    },
    myBubble: {
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 11,
        marginTop: 4,
        opacity: 0.5,
        textAlign: "right",
    },
    inputArea: {
        paddingHorizontal: GlassStyles.spacing.md,
        paddingTop: GlassStyles.spacing.sm,
        borderTopWidth: 1,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: GlassStyles.spacing.sm,
    },
    glassInput: {
        flex: 1,
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginLeft: 8,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
});

export function ChatDetailScreen() {
    const { id, name } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];
    const isDark = colorScheme === "dark";
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState("");

    const renderMessage = ({ item, index }: { item: typeof MESSAGES[0]; index: number }) => (
        <Animated.View
            entering={item.isMe ? FadeInRight.delay(index * 100) : FadeInDown.delay(index * 100)}
            style={[
                styles.messageRow,
                item.isMe ? styles.myMessageRow : styles.otherMessageRow,
            ]}
        >
            {!item.isMe && (
                <View style={[styles.avatarWrap, { backgroundColor: `${colors.primary}20` }]}>
                    <Text style={{ fontSize: 18 }}>{item.avatar}</Text>
                </View>
            )}
            <View
                style={[
                    styles.messageBubble,
                    item.isMe ? styles.myBubble : styles.otherBubble,
                    {
                        backgroundColor: item.isMe ? colors.primary : colors.glass.background,
                        borderColor: item.isMe ? colors.primaryDark : colors.glass.border,
                    },
                ]}
            >
                <Text style={[styles.messageText, { color: item.isMe ? "#fff" : colors.text }]}>
                    {item.text}
                </Text>
                <Text style={[styles.messageTime, { color: item.isMe ? "rgba(255,255,255,0.7)" : colors.textSecondary }]}>
                    {item.time}
                </Text>
            </View>
        </Animated.View>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.background : "#F5F0EB" }]}>
            {/* Glass Header */}
            <View style={[
                styles.header,
                {
                    paddingTop: insets.top + 10,
                    backgroundColor: isDark ? "rgba(21, 23, 24, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    borderColor: colors.glass.border,
                }
            ]}>
                <BlurView intensity={20} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                <PressableScale onPress={() => router.back()} style={styles.backButton}>
                    <SymbolView name="chevron.left" size={24} tintColor={colors.primary} />
                </PressableScale>
                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{name || "Chat Room"}</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>24 Members • Online</Text>
                </View>
                <PressableScale style={styles.backButton}>
                    <SymbolView name="info.circle" size={22} tintColor={colors.textSecondary} />
                </PressableScale>
            </View>

            <FlatList
                data={MESSAGES}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10}>
                <View style={[
                    styles.inputArea,
                    {
                        backgroundColor: isDark ? "rgba(21, 23, 24, 0.8)" : "rgba(255, 255, 255, 0.8)",
                        borderColor: colors.glass.border,
                        paddingBottom: insets.bottom + 10,
                    }
                ]}>
                    <BlurView intensity={20} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.glassInput,
                                {
                                    backgroundColor: colors.glass.backgroundDark,
                                    borderColor: colors.glass.border,
                                    color: colors.text,
                                }
                            ]}
                            placeholder="Type a message..."
                            placeholderTextColor={colors.textSecondary}
                            value={message}
                            onChangeText={setMessage}
                        />
                        <PressableScale style={styles.sendButton}>
                            <LinearGradient
                                colors={Gradients.primary as any}
                                style={StyleSheet.absoluteFill}
                            />
                            <SymbolView name="paperplane.fill" size={20} tintColor="#fff" />
                        </PressableScale>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
