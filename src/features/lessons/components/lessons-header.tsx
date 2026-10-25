import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Back } from "@/components/ui/icons";

const HEADER_HEIGHT = 64;

export default function LessonHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: HEADER_HEIGHT + insets.top,
        },
      ]}
    >
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <Back color={styles.backIcon.color} size={styles.backIcon.fontSize} />
      </Pressable>

      <View style={styles.left}>
        <Text style={styles.title}>Lições disponíveis</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: 20,
    backgroundColor: "rgba(248, 251, 234, 0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#456800",
  },

  backIcon: {
    fontSize: 25,
    color: "#456800",
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});