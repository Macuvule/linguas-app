import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const levels = [
  "Todos",
  "Iniciante",
  "Intermediário",
  "Avançado",
];

type Props = {
  selectedLevel: string;
  onChange: (level: string) => void;
};

export default function LevelFilter({
  selectedLevel,
  onChange,
}: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {levels.map((level) => {
          const active = selectedLevel === level;

          return (
            <Pressable
              key={level}
              onPress={() => onChange(level)}
              style={[
                styles.chip,
                active ? styles.chipActive : styles.chipInactive,
              ]}
            >
              <Text
                style={[
                  styles.label,
                  active ? styles.labelActive : styles.labelInactive,
                ]}
              >
                {level}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 4,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 13,
  },
  chipActive: {
    backgroundColor: "#6b9e05",
  },
  chipInactive: {
    backgroundColor: "#cccfc6",
  },
  label: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  labelActive: {
    fontWeight: "700",
  },
  labelInactive: {
    fontWeight: "600",
  },
});