import React from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ICONS } from "@/components/ui/icons";

type Props = {
  id: number;
  title: string;
  description: string;
  image: string; // agora é a "chave" do ícone
  handlePress?: () => void;
};

export default function LessonCard({
  id,
  title,
  description,
  image,
  handlePress,
}: Props) {
  const Icon = ICONS[image];

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {Icon ? (
        <Icon width={80} height={80} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#eee" }]} />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Ionicons name="play-circle" size={20} color="#456800" />
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop:25,
  },

  image: {
  width: 80,
  height: 80,
  borderRadius: 8,
  flexShrink: 0,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 8,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b1b1b",
  },

  playIcon: {
  flexShrink: 0,
  marginTop: 2,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(169, 227, 75, 0.3)",
  },

  levelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#426300",
  },

  duration: {
    fontSize: 12,
    color: "#636262",
  },
  description: {
  fontSize: 13,
  color: "#636262",
  marginTop: 4,
  lineHeight:16,
},
});