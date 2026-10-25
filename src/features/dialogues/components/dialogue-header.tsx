import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Back } from "@/components/ui/icons";

type Props = {
  title: string;
};

export default function DialogueHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Back color={styles.backIcon.color} size={styles.backIcon.fontSize} />
      </Pressable>

      <Text
        numberOfLines={1}
        style={styles.title}
      >
        {title}
      </Text>
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
    paddingHorizontal: 16,
    backgroundColor: "#f8fbea",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop:10,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 25,
    color: "#456800",
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#191d13",
  },
});