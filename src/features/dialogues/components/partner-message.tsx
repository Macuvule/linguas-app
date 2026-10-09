import Avatar from "@/components/ui/avatar";
import SpeakerIcon from "@/components/ui/icons/speakerIcon";
import { useAudioPlayer } from "expo-audio";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SvgAvatarHero from '@/components/ui/illustrations/avatarHero';

type Props = {
  name: string;
  message: string;
  translation: string | null;
  originalAudio: number | null;
  userRecording: string | null;
};

export default function PartnerMessage({ name, message, translation, originalAudio, userRecording }: Props) {
  const player = useAudioPlayer(originalAudio);

  function playOriginalAudio() {
    if (!originalAudio) {
      console.log("Áudio original não encontrado.");
      return;
    }

    player.seekTo(0);
    player.play();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar name={name} size={32} Illustration={SvgAvatarHero} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <Pressable style={styles.bubble} onPress={playOriginalAudio}>
        <Text style={styles.message}>{message}</Text>
        <SpeakerIcon size={20} color="#456800" active={!!originalAudio} />

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

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 18,
    color: "#191d13",
  },

  translation: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#5f5e5e",
  },
});