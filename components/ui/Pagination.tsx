import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      onPageChange(page);
    }
  };

  const isPreviousDisabled = currentPage <= 1 || isLoading;
  const isNextDisabled = currentPage >= totalPages || isLoading;

  if (totalPages <= 1) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPreviousDisabled && styles.disabledButton]}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            isPreviousDisabled && styles.disabledButtonText,
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>
          {currentPage} of {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isNextDisabled && styles.disabledButton]}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={isNextDisabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            isNextDisabled && styles.disabledButtonText,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#e9ecef",
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledButtonText: {
    color: "#6c757d",
  },
  pageInfo: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  pageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    textAlign: "center",
  },
});
