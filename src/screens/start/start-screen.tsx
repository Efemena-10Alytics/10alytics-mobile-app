import { Colors, GlassStyles, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/utils/auth-store";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { PressableScale } from "pressto";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingShape1: {
    position: "absolute",
    top: height * 0.1,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.3,
  },
  floatingShape2: {
    position: "absolute",
    top: height * 0.3,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.25,
  },
  floatingShape3: {
    position: "absolute",
    bottom: height * 0.15,
    left: width * 0.3,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.2,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: GlassStyles.spacing.lg,
  },
  lottieContainer: {
    width: 280,
    height: 280,
    borderRadius: GlassStyles.borderRadius.xl,
    overflow: "hidden",
    marginBottom: GlassStyles.spacing.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    ...GlassStyles.shadow.medium,
  },
  lottieBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: GlassStyles.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
    marginBottom: GlassStyles.spacing.sm,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: GlassStyles.spacing.md,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  glassButton: {
    width: "100%",
    maxWidth: 280,
    borderRadius: GlassStyles.borderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    ...GlassStyles.shadow.heavy,
  },
  buttonBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },
  buttonGlow: {
    position: "absolute",
    top: -50,
    left: "25%",
    width: "50%",
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
  },
});

export function StartScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const lottieRef = useRef<LottieView>(null);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    lottieRef.current?.play();
  }, []);

  React.useEffect(() => {
    if (isNavigationReady && hasCompletedOnboarding && isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isNavigationReady, hasCompletedOnboarding, isLoggedIn]);

  const handleGetStarted = () => {
    if (hasCompletedOnboarding && !isLoggedIn) {
      router.replace("/sign-in");
    } else {
      router.replace("/onboarding");
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated gradient background */}
      <LinearGradient
        colors={isDark ? ["#1a1a2e", "#16213e", "#0f0f23"] : ["#FFF5EE", "#FFE4D6", "#FFD4B8"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating glassmorphic shapes */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.floatingShape1}
        />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(400).duration(1000)}>
        <LinearGradient
          colors={[colors.primaryLight, colors.primary]}
          style={styles.floatingShape2}
        />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(600).duration(1000)}>
        <LinearGradient
          colors={[colors.primary, "#FFB088"]}
          style={styles.floatingShape3}
        />
      </Animated.View>

      <SafeAreaView style={styles.content} edges={["top", "bottom"]}>
        {/* Glassmorphic Lottie container */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={[styles.lottieContainer, { backgroundColor: colors.glass.background }]}>
            <BlurView
              intensity={GlassStyles.blur.light}
              tint={isDark ? "dark" : "light"}
              style={styles.lottieBlur}
            />
            <LottieView
              ref={lottieRef}
              source={require("@/assets/lottie/welcome.json")}
              style={styles.lottie}
              loop
              autoPlay
            />
          </View>
        </Animated.View>

        {/* Text content */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? "#fff" : colors.text }]}>
            Welcome to 10Alytics
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.8)" : colors.textSecondary }]}>
            {hasCompletedOnboarding
              ? "Your analytics companion. Get started in seconds."
              : "Complete your onboarding to unlock your learning journey."}
          </Text>
        </Animated.View>

        {/* Glassmorphic CTA button */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.buttonContainer}>
          <PressableScale onPress={handleGetStarted} style={styles.glassButton}>
            <BlurView
              intensity={GlassStyles.blur.medium}
              tint="default"
              style={styles.buttonBlur}
            />
            <LinearGradient
              colors={Gradients.primary as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              {/* Glow effect */}
              <View style={[styles.buttonGlow, { backgroundColor: "#fff" }]} />
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </PressableScale>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
