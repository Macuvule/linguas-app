import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components/safeArea/screen";

import QuizScreen from "@/features/quiz/quiz-screen";

export default function ExercisesRoute() {
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
      <QuizScreen lessonId={id} 
      onContinue={() => router.back()} />
    </Screen>
  );
}