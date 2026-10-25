
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  getQuizByLesson,
  type QuizQuestionWithOptions,
} from "@/database/repositories/quizRepository";

import QuizProgress from "./components/quizProgress";
import QuestionCard from "./components/questionCard";
import AnswerOption from "./components/answerOption";
import QuizFeedback from "./components/quizFeedback";
import QuizButton from "./components/quizButton";
import QuizResult from "./components/quizResult";

type QuizScreenProps = {
  lessonId: number;
  onContinue: () => void;
};

export default function QuizScreen({
  lessonId,
  onContinue,
}: QuizScreenProps) {
  const [questions, setQuestions] = useState<QuizQuestionWithOptions[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const result = getQuizByLesson(lessonId);
      setQuestions(result);
    } catch (error) {
      console.error("Erro ao carregar quiz:", error);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  const currentQuestion = questions[currentIndex];

  const selectedOption = currentQuestion?.options.find(
    (option) => option.id === selectedOptionId
  );

  const isCorrect = selectedOption?.is_correct === 1;

  function handleSelectOption(optionId: number) {
    if (selectedOptionId !== null || finished) return;

    setSelectedOptionId(optionId);

    const option = currentQuestion?.options.find(
      (item) => item.id === optionId
    );

    if (option?.is_correct === 1) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNextQuestion() {
    if (selectedOptionId === null) return;

    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setSelectedOptionId(null);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    setFinished(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>A carregar o quiz...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Ainda não existem perguntas para esta lição.
        </Text>
        <QuizButton
          title="Voltar à lição"
          onPress={onContinue}
        />
      </View>
    );
  }

  if (finished) {
    return (
      <QuizResult
        score={score}
        total={questions.length}
        onRetry={handleRetry}
        onContinue={onContinue}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <QuizProgress
        current={currentIndex + 1}
        total={questions.length}
      />

      <QuestionCard
        question={currentQuestion.question_text}
        questionNumber={currentIndex + 1}
      />

      {currentQuestion.options.map((option, index) => (
        <AnswerOption
          key={option.id}
          optionId={option.id}
          text={option.option_text}
          letter={String.fromCharCode(65 + index)}
          selected={selectedOptionId === option.id}
          correct={option.is_correct === 1}
          disabled={selectedOptionId !== null}
          onPress={() => handleSelectOption(option.id)}
        />
    ))}

      {selectedOptionId !== null && (
        <QuizFeedback
          correct={isCorrect}
          explanation={currentQuestion.explanation}
        />
      )}

      <QuizButton
        disabled={selectedOptionId === null}
        onPress={handleNextQuestion}
        title={
          currentIndex === questions.length - 1
            ? "Ver resultado"
            : "Próxima pergunta"
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 20,
  },
  message: {
    color: "#334155",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
