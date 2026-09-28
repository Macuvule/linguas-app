import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

import {
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
} from "expo-audio";

import { saveRecording, getRecordingByDialogueLine } from "@/database/repositories/userRecordingRepository";
import { saveRecordingFile } from "@/services/recordingStorage";

type Props = {
  dialogueLineId: number;
  initialAudioUri?: string | null;
  onRecorded?: (uri: string) => void;
};

export default function RecordingButton({ dialogueLineId, initialAudioUri, onRecorded }: Props) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const [audioUri, setAudioUri] = useState<string | null>(initialAudioUri ?? null);

  /*
   * Quando o DialogueScreen muda de fala,
   * sincronizamos a gravação recebida.
   */
  useEffect(() => {
    setAudioUri(initialAudioUri ?? null);
  }, [initialAudioUri]);

  const player = useAudioPlayer(audioUri);

  async function startRecording() {
    const permission =
      await requestRecordingPermissionsAsync();

    console.log("Resultado da permissão:", permission);

    if (!permission.granted) {
      console.log("Permissão para gravar foi negada.");
      return;
    }

    console.log("Permissão concedida.");

    await recorder.prepareToRecordAsync();

    console.log("Gravador preparado.");

    recorder.record();

    console.log("Gravação iniciada.");
  }

async function stopRecording() {
  await recorder.stop();

  const temporaryUri = recorder.uri;

  console.log("=================================");
  console.log("URI temporário:", temporaryUri);

  if (!temporaryUri) {
    console.log(
      "ERRO: não foi possível obter o URI da gravação."
    );
    return;
  }

  // 1. Copiar o arquivo temporário
  // para o armazenamento permanente
  const permanentUri =
    await saveRecordingFile(temporaryUri);

  console.log(
    "URI permanente:",
    permanentUri
  );

  // 2. Salvar o caminho no SQLite
  saveRecording(
    dialogueLineId,
    permanentUri
  );

  console.log(
    "Gravação salva no SQLite para dialogueLineId:",
    dialogueLineId
  );

  // 3. Verificar se foi salva no SQLite
  const savedRecording =
    getRecordingByDialogueLine(
      dialogueLineId
    );

  console.log(
    "Gravação encontrada no SQLite:",
    savedRecording
  );

  // 4. Atualizar estado local
  setAudioUri(permanentUri);

  // 5. Informar o DialogueScreen
  onRecorded?.(permanentUri);

  console.log("=================================");
}

  function playRecording() {
    if (!audioUri) {
      console.log("Nenhuma gravação disponível.");
      return;
    }

    player.seekTo(0);
    player.play();
  }

  const isRecording = recorderState.isRecording;

  return (
    <View style={styles.container}>
      {!audioUri && !isRecording && (
        <Pressable style={styles.recordButton} onPress={startRecording}>
          <Text style={styles.icon}>🎙️</Text>
          <Text style={styles.text}>Gravar resposta</Text>
        </Pressable>
      )}

      {isRecording && (
        <Pressable style={styles.stopButton} onPress={stopRecording}>
          <Text style={styles.icon}>⏹️</Text>
          <Text style={styles.text}>Parar gravação</Text>
        </Pressable>
      )}

      {audioUri && !isRecording && (
        <View style={styles.recordedContainer}>
          <Pressable style={styles.playButton} onPress={playRecording}>
            <Text style={styles.icon}>▶️</Text>
            <Text style={styles.text}>Ouvir gravação</Text>
          </Pressable>

          <Pressable style={styles.recordAgainButton} onPress={() => setAudioUri(null)}>
            <Text style={styles.recordAgainText}>Gravar novamente</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  recordButton: {
    backgroundColor: "#456800",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  stopButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  recordedContainer: {
    gap: 12,
  },

  playButton: {
    backgroundColor: "#456800",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  recordAgainButton: {
    paddingVertical: 10,
    alignItems: "center",
  },

  recordAgainText: {
    color: "#456800",
    fontSize: 14,
    fontWeight: "600",
  },

  icon: {
    fontSize: 20,
    marginBottom: 4,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});