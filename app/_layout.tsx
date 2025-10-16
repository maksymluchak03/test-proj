import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ROUTES } from "@/constants/routes";
import { AppProviders } from "@/components/providers/AppProviders";

const isLoggedIn = true;

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name={ROUTES.PRIVATE_TABS}
            options={{ headerShown: false }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name={ROUTES.INDEX} options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>

      <StatusBar style="auto" />
    </AppProviders>
  );
}
