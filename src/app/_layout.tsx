import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { useAuthStore } from "@/utils/auth-store";
import { Platform } from "react-native";
import { useColorScheme } from '@/hooks/use-color-scheme';
import '@/global.css';

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
  } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <React.Fragment>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
            <Stack.Screen name="sign-in" />
            <Stack.Protected guard={shouldCreateAccount}>
              <Stack.Screen name="create-account" />
            </Stack.Protected>
          </Stack.Protected>
          <Stack.Protected guard={!hasCompletedOnboarding}>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </React.Fragment>
    </ThemeProvider>
  );
}
