import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components/safeArea/screen";

import DialogueScreen from "@/features/dialogues/dialogue-screen";

export default function DialogueRoute() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  const id = Number(lessonId);

  if (!Number.isFinite(id)) {
    return null;
  }

  return (
    <Screen edges={["top"]}>
      <DialogueScreen lessonId={id}
        onExercisePress = {()=>{
          router.push (`/lesson/exercises/${id}`)
        }}
      />
    </Screen>
  );
}