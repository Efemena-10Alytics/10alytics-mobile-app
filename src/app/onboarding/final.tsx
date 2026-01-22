import { View } from "react-native";
import { AppText } from "@/src/components/app-text";
import { Button } from "@/src/components/button";
import { useAuthStore } from "@/src/utils/auth-store";

export default function OnboardingFinalScreen() {
  const { completeOnboarding } = useAuthStore();

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Onboarding Screen 2
      </AppText>
      <Button title="Complete onboarding" onPress={completeOnboarding} />
    </View>
  );
}
