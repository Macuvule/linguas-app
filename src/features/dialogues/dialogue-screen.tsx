import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import DialogueHeader from "./components/dialogue-header";
import DialogueProgress from "./components/dialogue-progress";
import PartnerMessage from "./components/partner-message";
import RecordingButton from "./components/recording-button";
import SpeakerSelector from "./components/speaker-selector";
import UserMessage from "./components/user-message";

import { getOriginalAudio } from "@/constants/audio/audioRegistry";
import { Dialogue, getDialogueByLesson } from "@/database/repositories/dialogueRepository";
import { getRecordingByDialogueLine } from "@/database/repositories/userRecordingRepository";

type Props = {
  lessonId: number;
  onExercisePress: () => void
};

export default function DialogueScreen({ lessonId, onExercisePress }: Props) {
  const [dialogue, setDialogue] = useState<Dialogue | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [userRecording, setUserRecording] = useState<string | null>(null);

  /*
   * Carrega o diálogo quando a lição muda.
   */
  useEffect(() => {
    const data = getDialogueByLesson(lessonId);

    setDialogue(data);
    setSelectedSpeaker(null);
    setCurrentIndex(0);
    setHasRecording(false);
    setUserRecording(null);
  }, [lessonId]);

  /*
   * Descobre a linha atual.
   *
   * Enquanto o diálogo ainda não foi carregado,
   * currentLine será undefined.
   */
  const currentLine = dialogue?.lines[currentIndex];

  /*
   * Busca a gravação salva para a fala atual.
   *
   * Este hook precisa estar antes de qualquer
   * return condicional.
   */
  useEffect(() => {
    if (!currentLine) {
      setUserRecording(null);
      setHasRecording(false);
      return;
    }

    const recording = getRecordingByDialogueLine(currentLine.id);
    const audioPath = recording?.audio_path ?? null;

    setUserRecording(audioPath);
    setHasRecording(audioPath !== null);
  }, [currentLine?.id]);

  /*
   * Agora podemos fazer o return condicional,
   * porque todos os hooks já foram executados.
   */
  if (!dialogue) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum diálogo encontrado para esta lição.</Text>
      </View>
    );
  }

  const speakers = Array.from(new Set(dialogue.lines.map((line) => line.speaker)));
  const finished = currentIndex >= dialogue.lines.length;

  /*
   * Busca o áudio original da fala atual.
   */
  const originalAudio =
    currentLine && dialogue.audio_group
      ? getOriginalAudio(dialogue.language_code, dialogue.audio_group, currentLine.audio_key)
      : null;

  function goToNextLine() {
    setCurrentIndex((previous) => previous + 1);
    setHasRecording(false);
    setUserRecording(null);
  }

  return (
    <View style={styles.container}>
      <DialogueHeader title={dialogue.title} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <DialogueProgress
          current={finished ? dialogue.lines.length : currentIndex + 1}
          total={dialogue.lines.length}
        />

        <SpeakerSelector
          speakers={speakers}
          selectedSpeaker={selectedSpeaker}
          onSelect={(speaker) => {
            setSelectedSpeaker(speaker);
            setCurrentIndex(0);
            setHasRecording(false);
            setUserRecording(null);
          }}
        />

        <View style={styles.content}>
          {!finished && currentLine && (
            <>
              {selectedSpeaker && currentLine.speaker === selectedSpeaker ? (
                <>
                  <UserMessage text={currentLine.text} translation={currentLine.translation ?? ""} originalAudio={originalAudio} />

                  <RecordingButton
                    key={`${selectedSpeaker}-${currentLine.id}`}
                    dialogueLineId={currentLine.id}
                    initialAudioUri={userRecording}
                    onRecorded={(uri) => {
                      console.log("Gravação da fala:", currentLine.id);
                      console.log("URI permanente:", uri);

                      setUserRecording(uri);
                      setHasRecording(true);
                    }}
                  />

                  {hasRecording && (
                    <Pressable style={styles.nextButton} onPress={goToNextLine}>
                      <Text style={styles.nextButtonText}>Próximo</Text>
                    </Pressable>
                  )}
                </>
              ) : (
                <>
                  <PartnerMessage
                    name={currentLine.speaker}
                    message={currentLine.text}
                    translation={currentLine.translation ?? ""}
                    originalAudio={originalAudio}
                    userRecording={userRecording}
                  />

                  <Pressable style={styles.nextButton} onPress={goToNextLine}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                  </Pressable>
                </>
              )}
            </>
          )}

          {finished && (
            <View style={styles.finishedContainer}>
              <Text style={styles.finishedTitle}>Conversação concluída!</Text>
              <Text style={styles.finishedText}>
                Parabéns! Terminaste esta prática de conversação.
              </Text>

              <Pressable
                style={styles.nextButton}
                onPress={() => {
                  setCurrentIndex(0);
                  setHasRecording(false);
                  setUserRecording(null);
                }}
              >
                <Text style={styles.nextButtonText}>Repetir</Text>
              </Pressable>

              <Pressable
                style={styles.exercisesButton}
                onPress={onExercisePress}
              >
                <Text style={styles.exercisesButtonText}>Ir para os exercícios</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fbea",
  },

  scrollContent: {
    paddingTop: 64,
    paddingBottom: 32,
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },

  nextButton: {
    alignSelf: "stretch",
    backgroundColor: "#456800",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  exercisesButton: {
    alignSelf: "stretch",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#456800",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  exercisesButtonText: {
    color: "#456800",
    fontSize: 16,
    fontWeight: "700",
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  finishedContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },

  finishedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#456800",
    textAlign: "center",
    marginBottom: 12,
  },

  finishedText: {
    fontSize: 14,
    color: "#5f5e5e",
    textAlign: "center",
    marginBottom: 24,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fbea",
    paddingHorizontal: 24,
  },

  emptyText: {
    fontSize: 16,
    color: "#5f5e5e",
    textAlign: "center",
  },
});