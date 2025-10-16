import { useAuthStore } from "@/stores/authStore";
import {
  // DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await useAuthStore.getState().loadUserFromStorage();
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          value={DefaultTheme}
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
