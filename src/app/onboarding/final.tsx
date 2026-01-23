import { AppText } from "@/components/app-text";
import { Button } from "@/components/button";
import { useAuthStore } from "@/utils/auth-store";
import { View } from "react-native";

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
