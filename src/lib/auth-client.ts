import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000", // Update with your backend URL
  plugins: [
    expoClient({
      scheme: "10alyticsapp",
      storagePrefix: "10alyticsapp",
      storage: SecureStore,
    }),
  ],
});
