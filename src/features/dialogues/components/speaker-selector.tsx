import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  speakers: string[];
  selectedSpeaker: string | null;
  onSelect: (speaker: string) => void;
};

export default function SpeakerSelector({
  speakers,
  selectedSpeaker,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Escolha o seu personagem
      </Text>

      <View style={styles.options}>
        {speakers.map((speaker) => {
          const selected = speaker === selectedSpeaker;

          return (
            <Pressable
              key={speaker}
              onPress={() => onSelect(speaker)}
              style={[
                styles.option,
                selected && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.selectedText,
                ]}
              >
                {speaker}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5f5e5e",
  },

  options: {
    flexDirection: "row",
    gap: 8,
  },

  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#e1e4d4",
  },

  selectedOption: {
    backgroundColor: "#456800",
  },

  optionText: {
    fontWeight: "600",
    color: "#434937",
  },

  selectedText: {
    color: "#FFFFFF",
  },
});