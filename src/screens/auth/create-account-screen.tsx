import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiClient } from "@/lib/api-client";
import { KeyboardAvoidingView, PressableScale, ScrollView, Text, TextInput, View } from "@/tw";
import { Animated } from "@/tw/animated";
import { useAuthStore } from "@/utils/auth-store";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  gradientHeader: {
    paddingTop: 80,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: "center",
    color: "#FFFFFF",
  },
  content: { flex: 1, paddingHorizontal: 24, marginTop: 32 },
  fieldWrap: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  eyeButton: { padding: 8 },
  hint: { fontSize: 12, marginTop: 8 },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 16, fontSize: 14 },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  secondaryButtonEmoji: { fontSize: 24, marginRight: 12 },
  secondaryButtonText: { fontSize: 16, fontWeight: "600" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerHint: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: "600" },
});

export function CreateAccountScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { logIn } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await apiClient.register(name, email, password);

      if (error) {
        const errorMessage =
          error.errors && Object.keys(error.errors).length > 0
            ? Object.values(error.errors)[0][0]
            : error.message || "Sign up failed. Please try again.";
        Alert.alert("Sign Up Failed", errorMessage);
        setLoading(false);
        return;
      }

      if (data && data.user) {
        logIn(data.user);
        router.replace("/(tabs)");
      }
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const { data, error } = await apiClient.googleAuth();

      if (error) {
        Alert.alert("Sign Up Failed", error.message);
        setLoading(false);
        return;
      }

      if (data) {
        logIn(data);
        router.replace("/(tabs)");
      }
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          style={styles.gradientHeader}
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text style={styles.headerTitle}>
              Create Account
            </Text>
            <Text style={styles.headerSubtitle}>
              Start your learning journey today
            </Text>
          </Animated.View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Name Input */}
          <Animated.View entering={FadeInRight.delay(200)}>
            <View style={styles.fieldWrap}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Full Name
              </Text>
              <View
                style={[
                  styles.inputRow,
                  {
                    backgroundColor: `${colors.primary}10`,
                    borderWidth: 1,
                    borderColor: `${colors.primary}30`,
                  },
                ]}
              >
                <AntDesign name="user" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.icon}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </Animated.View>

          {/* Email Input */}
          <Animated.View entering={FadeInRight.delay(300)}>
            <View style={styles.fieldWrap}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputRow,
                  {
                    backgroundColor: `${colors.primary}10`,
                    borderWidth: 1,
                    borderColor: `${colors.primary}30`,
                  },
                ]}
              >
                <AntDesign name="mail" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.icon}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>
          </Animated.View>

          {/* Password Input */}
          <Animated.View entering={FadeInRight.delay(400)}>
            <View style={[styles.fieldWrap, { marginBottom: 24 }]}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Password
              </Text>
              <View
                style={[
                  styles.inputRow,
                  {
                    backgroundColor: `${colors.primary}10`,
                    borderWidth: 1,
                    borderColor: `${colors.primary}30`,
                  },
                ]}
              >
                <AntDesign name="lock" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Create a password"
                  placeholderTextColor={colors.icon}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                />
                <PressableScale
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <AntDesign name="eye-invisible" size={20} color={colors.icon} />
                  ) : (
                    <AntDesign name="eye" size={20} color={colors.icon} />
                  )}
                </PressableScale>
              </View>
              <Text style={[styles.hint, { color: colors.icon }]}>
                Must be at least 8 characters
              </Text>
            </View>
          </Animated.View>

          {/* Sign Up Button */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <PressableScale
              onPress={handleSignUp}
              disabled={loading}
              style={[
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? "Creating account..." : "Create Account"}
              </Text>
            </PressableScale>
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: colors.icon }]} />
            <Text style={[styles.dividerText, { color: colors.icon }]}>
              OR
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.icon }]} />
          </Animated.View>

          {/* Google Sign Up Button */}
          <Animated.View entering={FadeInDown.delay(700)}>
            <PressableScale
              onPress={handleGoogleSignUp}
              disabled={loading}
              style={[
                styles.secondaryButton,
                {
                  borderColor: colors.primary,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
            >
              <Text style={styles.secondaryButtonEmoji}>🔍</Text>
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                Continue with Google
              </Text>
            </PressableScale>
          </Animated.View>

          {/* Sign In Link */}
          <Animated.View entering={FadeInDown.delay(800)} style={styles.footerRow}>
            <Text style={[styles.footerHint, { color: colors.icon }]}>
              Already have an account?{" "}
            </Text>
            <PressableScale onPress={() => router.push("/sign-in")}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
