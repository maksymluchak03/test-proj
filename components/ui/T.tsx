import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type TProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function T({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: TProps) {
  const colors = useThemeColor();

  return (
    <Text
      style={[
        type === "default" ? { ...styles.default, color: colors.text } : undefined,
        type === "title" ? { ...styles.title, color: colors.text } : undefined,
        type === "defaultSemiBold" ? { ...styles.defaultSemiBold, color: colors.text } : undefined,
        type === "link" ? { ...styles.link, color: colors.text } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  default: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  defaultSemiBold: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
