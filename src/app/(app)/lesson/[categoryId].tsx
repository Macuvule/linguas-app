import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import LessonScreen from "@/features/lessons/lesson-screen";

export default function CategoryLessons() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  return (
    <View style={{ flex: 1 }}>
      <LessonScreen
        categoryId={Number(categoryId)}
        onLessonPress={(id) => router.push(`/lesson/dialogues/${id}`)}
      />
    </View>
  );
}