import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/utils/auth-store";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";


export default function SignInScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { logIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await apiClient.login(email, password);

      if (error) {
        const errorMessage =
          error.errors && Object.keys(error.errors).length > 0
            ? Object.values(error.errors)[0][0]
            : error.message || "Sign in failed. Please try again.";
        Alert.alert("Sign In Failed", errorMessage);
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await apiClient.googleAuth();

      if (error) {
        Alert.alert("Sign In Failed", error.message);
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
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, `${colors.primary}DD`]}
          className="pt-20 pb-12 px-6 rounded-b-3xl"
        >
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              className="text-4xl font-bold mb-2 text-center"
              style={{ color: "#FFFFFF" }}
            >
              Welcome Back!
            </Text>
            <Text
              className="text-base opacity-90 text-center"
              style={{ color: "#FFFFFF" }}
            >
              Sign in to continue your learning journey
            </Text>
          </Animated.View>
        </LinearGradient>

        <View className="flex-1 px-6 mt-8">
          {/* Email Input */}
          <Animated.View entering={FadeInRight.delay(200)}>
            <View className="mb-4">
              <Text
                className="text-sm font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Email
              </Text>
              <View
                className="flex-row items-center rounded-2xl px-4"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderWidth: 1,
                  borderColor: `${colors.primary}30`,
                }}
              >
                <AntDesign name="mail" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 py-4 text-base"
                  style={{ color: colors.text }}
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
          <Animated.View entering={FadeInRight.delay(300)}>
            <View className="mb-6">
              <Text
                className="text-sm font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Password
              </Text>
              <View
                className="flex-row items-center rounded-2xl px-4"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderWidth: 1,
                  borderColor: `${colors.primary}30`,
                }}
              >
                <AntDesign name="lock" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 py-4 text-base"
                  style={{ color: colors.text }}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.icon}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-2"
                >
                  {showPassword ? (
                    <AntDesign name="eye-invisible" size={20} color={colors.icon} />
                  ) : (
                    <AntDesign name="eye" size={20} color={colors.icon} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Sign In Button */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <TouchableOpacity
              onPress={handleEmailSignIn}
              disabled={loading}
              className="py-4 rounded-2xl items-center mb-4"
              style={{
                backgroundColor: colors.primary,
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Text className="text-base font-bold text-white">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="flex-row items-center my-6"
          >
            <View
              className="flex-1 h-px"
              style={{ backgroundColor: colors.icon }}
            />
            <Text
              className="mx-4 text-sm"
              style={{ color: colors.icon }}
            >
              OR
            </Text>
            <View
              className="flex-1 h-px"
              style={{ backgroundColor: colors.icon }}
            />
          </Animated.View>

          {/* Google Sign In Button */}
          <Animated.View entering={FadeInDown.delay(600)}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={loading}
              className="flex-row items-center justify-center py-4 rounded-2xl border-2"
              style={{
                borderColor: colors.primary,
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Text className="text-2xl mr-3">🔍</Text>
              <Text
                className="text-base font-semibold"
                style={{ color: colors.primary }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Sign Up Link */}
          <Animated.View
            entering={FadeInDown.delay(700)}
            className="flex-row justify-center mt-6"
          >
            <Text
              className="text-sm"
              style={{ color: colors.icon }}
            >
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/create-account")}>
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
