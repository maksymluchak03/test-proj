import { StyleProp, View, ViewStyle } from "react-native";

export default function ScreenLayout({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[{ flex: 1, padding: 16 }, style]}>{children}</View>;
}
