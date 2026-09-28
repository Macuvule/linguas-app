import React, { useRef } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import { useAudioPlayer } from "expo-audio";

type Props = {
  name?: string;
  message: string;
  translation?: string;
  originalAudio?: number;
  userAudioUri?: string | null;
  isUser?: boolean;
};

export default function InteractiveMessage({
  name,
  message,
  translation,
  originalAudio,
  userAudioUri,
  isUser = false,
}: Props) {
  const lastTap = useRef(0);
  const singleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Player do áudio original.
   */
  const originalPlayer = useAudioPlayer(originalAudio);

  /*
   * Player da gravação do usuário.
   */
  const userPlayer = useAudioPlayer(userAudioUri);

  function playOriginalAudio() {
    if (!originalAudio) return;

    originalPlayer.seekTo(0);
    originalPlayer.play();
  }

  function playUserAudio() {
    if (!userAudioUri) {
      console.log("Ainda não existe uma gravação do usuário.");
      return;
    }

    userPlayer.seekTo(0);
    userPlayer.play();
  }

  function handlePress() {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 250;

    /*
     * Segundo toque detectado.
     */
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      /*
       * Cancela o áudio original que estava
       * esperando para tocar.
       */
      if (singleTapTimeout.current) {
        clearTimeout(singleTapTimeout.current);
      }

      playUserAudio();
      lastTap.current = 0;

      return;
    }

    /*
     * Primeiro toque.
     */
    lastTap.current = now;

    /*
     * Esperamos um pouco para verificar se
     * haverá um segundo toque.
     */
    singleTapTimeout.current = setTimeout(() => {
      playOriginalAudio();
      lastTap.current = 0;
    }, DOUBLE_TAP_DELAY);
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.container, isUser ? styles.userContainer : styles.partnerContainer]}>
        {name && <Text style={styles.name}>{name}</Text>}

        <Text style={[styles.message, isUser && styles.userMessage]}>{message}</Text>

        {translation && (
          <Text style={[styles.translation, isUser && styles.userTranslation]}>
            {translation}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
  },

  partnerContainer: {
    backgroundColor: "#edf0df",
    alignSelf: "flex-start",
  },

  userContainer: {
    backgroundColor: "#456800",
    alignSelf: "flex-end",
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#456800",
    marginBottom: 6,
  },

  message: {
    fontSize: 16,
    color: "#30332b",
  },

  userMessage: {
    color: "#FFFFFF",
  },

  translation: {
    fontSize: 13,
    marginTop: 6,
    color: "#73776b",
  },

  userTranslation: {
    color: "#E5EAD5",
  },
});