import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  current: number;
  total: number;
};

export default function DialogueProgress({
  current,
  total,
}: Props) {
  const percentage =
    total > 0
      ? Math.min((current / total) * 100, 100)
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          Prática de conversação
        </Text>

        <Text style={styles.step}>
          Passo {current} de {total}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fbea",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    fontWeight: "600",
    color: "#456800",
  },

  step: {
    fontWeight: "600",
    color: "#5f5e5e",
  },

  track: {
    height: 8,
    backgroundColor: "#edf0df",
    borderRadius: 999,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: "#456800",
    borderRadius: 999,
  },
});