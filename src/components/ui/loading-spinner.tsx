import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
};

export default function LoadingSpinner({
  message,
  size = "large",
  fullScreen = false,
}: Props) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color="#456800" />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 12,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#f8fbea",
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    color: "#456800",
  },
});