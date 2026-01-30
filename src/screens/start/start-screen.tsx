import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BUTTON_RADIUS = 14;
const SPACING = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING,
  },
  lottieWrap: {
    width: 280,
    height: 280,
    marginBottom: SPACING * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.6,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    opacity: 0.85,
    marginBottom: SPACING * 2,
    paddingHorizontal: SPACING,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: BUTTON_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});

export function StartScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const lottieRef = useRef<LottieView>(null);

  React.useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <View style={styles.lottieWrap}>
        <LottieView
          ref={lottieRef}
          source={require("@/assets/lottie/welcome.json")}
          style={{ width: "100%", height: "100%" }}
          loop
          autoPlay
        />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Welcome to 10alytics</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Your analytics companion. Get started in seconds.
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={() => router.replace("/onboarding")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}
