import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from "@/utils/auth-store";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const signInScreenOptions = {
  headerShown: true,
  title: "Sign In",
  contentStyle: { backgroundColor: "transparent" },
  ...(Platform.OS === "ios"
    ? {
      presentation: "formSheet" as const,
      sheetAllowedDetents: [0.5, 0.75, 1.0],
      sheetGrabberVisible: true,
    }
    : { presentation: "modal" as const }),
};

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      // Check authentication status when app loads
      checkAuth();
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated, checkAuth]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }

  return (
    <GestureHandlerRootView style={isWeb ? undefined : { flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <React.Fragment>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
              <Stack.Screen name="sign-in" options={signInScreenOptions} />
              <Stack.Protected guard={shouldCreateAccount}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="create-account" options={signInScreenOptions} />
              </Stack.Protected>
            </Stack.Protected>
            <Stack.Protected guard={!hasCompletedOnboarding}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </React.Fragment>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
