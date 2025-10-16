import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export default function CustomButton({
  title,
  onPress,
  touchableOpacityProps,
  variant = "primary",
}: {
  title: string;
  onPress: () => void;
  touchableOpacityProps?: TouchableOpacityProps;
  variant?: "primary" | "secondary";
}) {
  const buttonContainerStyle = useMemo(() => {
    return variant === "primary"
      ? styles.primaryButtonContainer
      : styles.secondaryButtonContainer;
  }, [variant]);

  const buttonTextStyle = useMemo(() => {
    return variant === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText;
  }, [variant]);

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      onPress={onPress}
      style={buttonContainerStyle}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
  },
  secondaryButtonContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#000000",
  },
  primaryButtonContainer: {
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
