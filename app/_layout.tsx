import { AppProviders } from "@/components/providers/AppProviders";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/authStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppProviders>
      <Stack>
        <Stack.Protected guard={!user}>
          <Stack.Screen name={ROUTES.INDEX} options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!!user}>
          <Stack.Screen
            name={ROUTES.PRIVATE_TABS}
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>

      <StatusBar style="auto" />
    </AppProviders>
  );
}
