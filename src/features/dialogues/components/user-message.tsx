import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  text: string;
};

export default function UserMessage({ text }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>
          "{text}"
        </Text>
      </View>

      <View style={styles.pronunciationBox}>
        <Text style={styles.pronunciationLabel}>
          ✓ PRONÚNCIA
        </Text>

        <Text style={styles.pronunciationText}>
          {text}
        </Text>

        <Text style={styles.tip}>
          Pratique esta frase em voz alta.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    maxWidth: "85%",
  },

  bubble: {
    backgroundColor: "#456800",
    padding: 16,
    borderRadius: 16,
    borderTopRightRadius: 0,
  },

  bubbleText: {
    fontSize: 18,
    color: "#FFFFFF",
  },

  pronunciationBox: {
    marginTop: 12,
    backgroundColor: "#f2f5e4",
    padding: 12,
    borderRadius: 12,
  },

  pronunciationLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#434937",
    marginBottom: 8,
  },

  pronunciationText: {
    fontSize: 18,
    color: "#456800",
  },

  tip: {
    fontSize: 12,
    color: "#5f5e5e",
    marginTop: 8,
  },
});