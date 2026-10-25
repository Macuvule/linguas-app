import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useAudioPlayer } from "expo-audio";
import  SpeakerIcon  from "@/components/ui/icons/speakerIcon";
import { useToggleAudio } from "@/lib/hooks/use-toggle-audio";  
import { Ionicons } from "@expo/vector-icons";

type Props = {
  text: string;
  translation: string;
  originalAudio?: number | null;
};

export default function UserMessage({ text, translation, originalAudio = null }: Props) {
  const { toggle, isPlaying, hasAudio } = useToggleAudio(originalAudio);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>
          "{text}"
        </Text>
      </View>

      <Pressable style={styles.pronunciationBox} onPress={toggle}>
        <View style={styles.pronunciationHeader}>
          <Text style={styles.pronunciationLabel}>✓ PRONÚNCIA</Text> 
          {hasAudio ? (
            <View style={styles.iconBox}>
              {isPlaying ? (
                <Ionicons name="pause" size={16} color="#456800" />
              ) : (
                <SpeakerIcon size={16} color="#456800" />
              )}
            </View>
          ) : (
            <Text style={styles.pronunciationLabel}>(Áudio não disponível)</Text>
          )}

        </View>
          <Text style={styles.pronunciationText}>
            {text}
          </Text>

          <Text style={styles.translation}>
            {translation}
          </Text>
        
      </Pressable>
    
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

  iconBox: {
  width: 16,
  height: 16,
  alignItems: "center",
  justifyContent: "center",
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
  },

  pronunciationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  pronunciationText: {
    fontSize: 18,
    color: "#456800",
  },

  translation: {
    fontSize: 14,
    color: "#5f5e5e",
    marginTop: 8,
  },
});