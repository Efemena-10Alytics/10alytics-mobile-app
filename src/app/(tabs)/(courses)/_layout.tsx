import { Stack } from "expo-router/stack";
import { PlatformColor } from "react-native";

export default function CoursesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerTitleStyle: { color: PlatformColor("label") },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Courses" }} />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: "Course",
          headerLargeTitle: false,
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.5, 1.0],
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
}
