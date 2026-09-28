import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui";
import LessonHeader from "./components/lessons-header";
import LessonCard from "./components/lesson-card";
import { useState, useEffect } from "react";
import { getLessonsByCategory, Lesson } from "@/database/repositories/lessonRepository";

type props = {
  categoryId: number;
  onLessonPress: (id: number) => void;
}

export default function LessonScreen({
  categoryId,
  onLessonPress,
}: props) {
      const [lessons, setLessons] = useState<Lesson[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
    
      useEffect(()=>{
        let isMounted = true;
    
        async function loadLessons() {
          try{
            setLoading(true);
            const data = await getLessonsByCategory(categoryId);
            if (isMounted) { setLessons(data); }
          } catch (err) {
            if (isMounted) setError("Não foi possível carregar as Licoes.")
          } finally {
            if (isMounted) setLoading(false);
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

            {!loading && error && (
              <View style={styles.emptyState}>
                <Text>{error}</Text>
              </View>
            )}
    
            {!loading && !error &&(
              <View style={styles.dialogueList}>
                {lessons.map((lesson) => (
                  <LessonCard key={lesson.id} {...lesson} 
                  handlePress={() => onLessonPress?.(lesson.id)} 
                  image={lesson.image} description={lesson.description ?? "Descricao indisponivel" } />
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
      },
    
      scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 80,
        paddingBottom: 112,
        gap: 24,
      },
    
      searchSection: {
        gap: 12,
      },
    
      dialogueList: {
        gap: 16,
      },
    
      emptyState: {
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 16,
      },
      
      emptyInfo: {
        marginTop: 16,
      },
    });
