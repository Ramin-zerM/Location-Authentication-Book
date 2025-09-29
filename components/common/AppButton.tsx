import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "danger";
};

const AppButton = ({ title, onPress, type = "primary" }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" && styles.secondary,
        type === "danger" && styles.danger,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  secondary: { backgroundColor: "#424242" },
  danger: { backgroundColor: "#EF4444" },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
