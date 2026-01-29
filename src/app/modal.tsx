import { PressableScale } from "@/tw";
import { Stack, useRouter } from "expo-router";
import { PlatformColor, ScrollView, Text } from "react-native";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Modal" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: PlatformColor("systemBackground") }}
        contentContainerStyle={{ padding: 24, gap: 16 }}
      >
        <Text
          selectable
          style={{
            fontSize: 17,
            color: PlatformColor("label"),
          }}
        >
          Placeholder for app-wide modal (e.g. notifications, settings sheet).
        </Text>
        <PressableScale
          onPress={() => router.back()}
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: PlatformColor("secondarySystemBackground"),
            borderCurve: "continuous",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: PlatformColor("systemBlue"),
            }}
          >
            Dismiss
          </Text>
        </PressableScale>
      </ScrollView>
    </>
  );
}
