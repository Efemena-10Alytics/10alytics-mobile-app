import '../../global.css';
import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import useThemedNavigation from '@/hooks/useThemedNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from "@/utils/auth-store";
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
    initialRouteName: 'index',
    anchor: '(tabs)',
};

const isWeb = Platform.OS === "web";

if (!isWeb) {
    SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
    const { screenOptions } = useThemedNavigation();
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <React.Fragment>
                    <StatusBar style="auto" />
                    <Stack screenOptions={screenOptions}>
                        <Stack.Protected guard={!hasCompletedOnboarding}>
                            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                        </Stack.Protected>
                        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="sign-in" options={{
                                title: "Sign In",
                                presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
                                sheetGrabberVisible: true,
                                sheetAllowedDetents: [0.4],
                                sheetCornerRadius: 24,
                                headerShown: false,
                                contentStyle: { backgroundColor: 'transparent' },
                            }} />
                            <Stack.Protected guard={shouldCreateAccount}>
                                <Stack.Screen name="create-account" options={{
                                    title: "Create Account",
                                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
                                    sheetGrabberVisible: true,
                                    sheetAllowedDetents: [0.4],
                                    sheetCornerRadius: 24,
                                    headerShown: false,
                                    contentStyle: { backgroundColor: 'transparent' },
                                }} />
                            </Stack.Protected>
                        </Stack.Protected>
                        <Stack.Protected guard={isLoggedIn}>
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="chat-room"
                                options={{
                                    headerShown: false,
                                    presentation: "card",
                                    animation: "default",
                                }}
                            />
                            <Stack.Screen
                                name="course-details"
                                options={{
                                    headerShown: false,
                                    presentation: "card",
                                    animation: "default",
                                }}
                            />
                            <Stack.Screen
                                name="settings"
                                options={{
                                    headerShown: false,
                                    presentation: "card",
                                    animation: "default",
                                }}
                            />
                        </Stack.Protected>
                    </Stack>
                </React.Fragment>

            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
