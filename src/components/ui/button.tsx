import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        (disabled || loading) && styles.buttonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#0B5D3B",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#0B5D3B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },

  buttonPressed: {
    transform: [{ scale: 0.97 }],
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});