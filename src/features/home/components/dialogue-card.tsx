import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ICONS } from "@/components/ui/icons";

type Props = {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string; // chave do ícone
  handlePress?: () => void;
};

export default function DialogueCard({
  id,
  title,
  level,
  description,
  image,
  handlePress
}: Props) {
  const Icon = ICONS[image];

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {Icon ? (
        <Icon width={100} height={100} />
      ) : (
        <Text>Sem imagem Disponivel</Text>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Ionicons name="play-circle" size={20} color="#456800" />
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
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
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b1b1b",
  },

  playIcon: {
    color: "#456800",
    fontSize: 20,
    marginLeft: 8,
  },

  description: {
    fontSize: 13,
    color: "#636262",
    marginTop: 4,
    marginBottom:6,
    lineHeight:18,
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
});