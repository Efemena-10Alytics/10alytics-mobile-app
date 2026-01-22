import { View } from "react-native";
import { AppText } from "@/src/components/app-text";
import { Link } from "expo-router";
import { Button } from "@/src/components/button";
import { useAuthStore } from "@/src/utils/auth-store";

export default function SignInScreen() {
    const { logIn } = useAuthStore();

    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Sign In Screen
            </AppText>
            <Button title="Sign in" onPress={logIn} />
            <Link asChild push href="/sign-in">
                <Button title="Open modal (disabled)" theme="secondary" />
            </Link>
        </View>
    );
}
