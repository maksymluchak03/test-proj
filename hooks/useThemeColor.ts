import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  return colors;
};
