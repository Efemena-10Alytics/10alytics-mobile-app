import { AppText } from "@/components/app-text";
import { Button } from "@/components/button";
import { Link } from "expo-router";
import { View } from "react-native";

export default function OnboardingFirstScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Onboarding Screen 1
      </AppText>
      <Link asChild push href="/onboarding/final">
        <Button title="Go to screen 2" />
      </Link>
    </View>
  );
}
