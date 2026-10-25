import Avatar from "@/components/ui/avatar";
import SpeakerIcon from "@/components/ui/icons/speakerIcon";
import { useAudioPlayer } from "expo-audio";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SvgAvatarHero from '@/components/ui/illustrations/avatarHero';
import { useToggleAudio } from "@/lib/hooks/use-toggle-audio";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  message: string;
  translation: string | null;
  originalAudio: number | null;
  userRecording: string | null;
};

export default function PartnerMessage({ name, message, translation, originalAudio, userRecording }: Props) {
  const { toggle, isPlaying, hasAudio } = useToggleAudio(originalAudio);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar name={name} size={32} Illustration={SvgAvatarHero} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <Pressable style={styles.bubble} onPress={toggle}>
        <View style={styles.messageRow}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.iconBox}>
              {isPlaying ? (
                <Ionicons name="pause" size={16} color="#456800" />
              ) : (
                <SpeakerIcon size={16} color="#456800" />
              )}
            </View>
        </View>
        {translation && <Text style={styles.translation}>{translation}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "85%",
    gap: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  name: {
    fontSize: 12,
    color: "#5f5e5e",
  },

  bubble: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    gap: 8,
  },

  message: {
    flex: 1,
    fontSize: 18,
    color: "#191d13",
  },

  iconBox: {
  width: 16,
  height: 16,
  alignItems: "center",
  justifyContent: "center",
  },

  messageRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 8,
  },

  translation: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#5f5e5e",
  },
});