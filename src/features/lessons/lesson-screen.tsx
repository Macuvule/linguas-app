import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui";
import LoadingSpinner from "@/components/ui/loading-spinner";
import LessonHeader from "./components/lessons-header";
import LessonCard from "./components/lesson-card";
import {
  getLessonsByCategory,
  Lesson,
} from "@/database/repositories/lessonRepository";

type Props = {
  categoryId: number;
  onLessonPress: (id: number) => void;
};

export default function LessonScreen({ categoryId, onLessonPress }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadedCategoryId, setLoadedCategoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // loading derivado: os dados em ecrã não são desta categoria
  const loading = loadedCategoryId !== categoryId;

  useEffect(() => {
    let isMounted = true;
    setError(null);

    async function loadLessons() {
      try {
        const data = await getLessonsByCategory(categoryId);
        if (isMounted) setLessons(data);
      } catch (err) {
        if (isMounted) {
          setLessons([]);
          setError("Não foi possível carregar as lições.");
        }
      } finally {
        if (isMounted) setLoadedCategoryId(categoryId);
      }
    }

    loadLessons();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <LessonHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading && <LoadingSpinner message="A carregar lições..." />}

        {!loading && error && (
          <View style={styles.emptyState}>
            <Text>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.lessonList}>
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                {...lesson}
                handlePress={() => onLessonPress?.(lesson.id)}
                image={lesson.image}
                description={lesson.description ?? "Descrição indisponível"}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fbea",
    marginTop:25,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 112,
    gap: 24,
  },
  lessonList: {
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});