import { AppText } from "@/components/app-text";
import { Button } from "@/components/button";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText size="large">Edit app/index.tsx to edit this screen.</AppText>
      <Button title="Click me" onPress={() => alert('Button pressed')} />
    </View>
  );
}
