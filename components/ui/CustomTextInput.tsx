import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

export type CustomTextInputProps<T extends FieldValues = any> = {
  control?: Control<T>;
  name?: Path<T>;
  secureTextEntry?: boolean;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<any>;
  editable?: boolean;
  error?: string;
  label?: string;
};

export default function CustomTextInput<T extends FieldValues>({
  control,
  name,
  secureTextEntry = false,
  placeholder,
  value,
  onChangeText,
  style,
  editable = true,
  error,
  label,
}: CustomTextInputProps<T>) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

  const renderInput = (fieldValue?: string, fieldOnChange?: (text: string) => void) => (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={isSecureTextEntry}
          style={[
            styles.input,
            { paddingRight: secureTextEntry ? 48 : 16 },
            error && { borderColor: "#ff3b30" },
            style,
          ]}
          placeholder={placeholder}
          value={fieldValue ?? value ?? ""}
          onChangeText={fieldOnChange ?? onChangeText}
          editable={editable}
          placeholderTextColor="#999999"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isSecureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="#999999"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          renderInput(value, onChange)
        }
      />
    );
  }

  return renderInput(value, onChangeText);
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    fontSize: 16,
    color: "#333333",
    backgroundColor: "#ffffff",
  },
  error: {
    color: "#ff3b30",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    position: "absolute",
    bottom: -15,
    left: 0,
    right: 0,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
