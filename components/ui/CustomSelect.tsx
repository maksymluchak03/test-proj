import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomSelect({
  value,
  placeholder,
  options,
  onChange,
  disabled = false,
  sortable = false,
  sortableValue,
  onSortableChange,
  zIndex = 1000,
  selectId,
  openSelectId,
  setOpenSelectId,
  multiple = false,
}: {
  value: string | string[] | null;
  placeholder: string;
  options: { label: string; value: string }[];
  onChange: (value: string | string[] | null) => void;
  disabled?: boolean;
  sortable?: boolean;
  sortableValue?: "asc" | "desc";
  onSortableChange?: (value: "asc" | "desc") => void;
  zIndex?: number;
  selectId: string;
  openSelectId: string | null;
  setOpenSelectId: (id: string | null) => void;
  multiple?: boolean;
}) {
  const isOpen = openSelectId === selectId;

  const handleToggle = () => {
    if (!disabled) {
      if (isOpen) {
        setOpenSelectId(null);
      } else {
        setOpenSelectId(selectId);
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      if (value === optionValue) {
        onChange(null);
      } else {
        onChange(optionValue);
      }
      setOpenSelectId(null);
    }
  };

  const getDisplayText = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find((opt) => opt.value === value[0]);
        return option?.label || value[0];
      }
      return `${value.length} items selected`;
    }
    if (!multiple && value) {
      const option = options.find((opt) => opt.value === value);
      return option?.label || value;
    }
    return placeholder;
  };

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <View
      style={[styles.container, { zIndex: isOpen ? zIndex + 1000 : zIndex }]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.selectButton, disabled && styles.disabledButton]}
            onPress={handleToggle}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                (!value || (Array.isArray(value) && value.length === 0)) &&
                  styles.placeholderText,
              ]}
            >
              {getDisplayText()}
            </Text>
            <Ionicons
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={disabled ? "#999" : "#666"}
            />
          </TouchableOpacity>
        </View>

        {sortable && value && (
          <TouchableOpacity
            onPress={() => {
              if (sortableValue === "asc") {
                onSortableChange?.("desc");
              } else {
                onSortableChange?.("asc");
              }
            }}
          >
            <View style={styles.sortableButton}>
              <Ionicons
                name={sortableValue === "asc" ? "arrow-up" : "arrow-down"}
                size={20}
                color="#666"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {isOpen && (
        <View style={[styles.dropdown, { zIndex: zIndex + 1001 }]}>
          <ScrollView
            style={styles.optionsList}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.optionItem,
                  isSelected(item.value) && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected(item.value) && styles.selectedOptionText,
                  ]}
                >
                  {item.label}
                </Text>
                {isSelected(item.value) && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    minHeight: 48,
  },
  sortableButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  placeholderText: {
    color: "#999999",
  },
  dropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderTopWidth: 0,
    borderRadius: 8,
  },
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedOption: {
    backgroundColor: "#f0f8ff",
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  selectedOptionText: {
    color: "#007AFF",
    fontWeight: "500",
  },
});
