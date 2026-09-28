import React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
} from "react-native";

export function Card({
  style,
  children,
  ...props
}: ViewProps) {
  return (
    <View
      {...props}
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,

    shadowColor: "#191D13",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
});