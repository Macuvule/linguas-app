import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { Back } from "@/components/ui/icons";

export default function LessonHeader() {
  return (
    <View style={styles.container}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          >
          <Back color={styles.backIcon.color} size={styles.backIcon.fontSize} />
        </Pressable>
      <View style={styles.left}>
        <Text style={styles.title}>Available Lessons</Text>
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
    height: 64,
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

  logo: {
    height: 32,
    width: 32,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#456800",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#456800",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
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