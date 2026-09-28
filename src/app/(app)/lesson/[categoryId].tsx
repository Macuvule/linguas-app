import { useLocalSearchParams, router } from "expo-router";
import LessonScreen from "@/features/lessons/lesson-screen";
import { Screen } from "@/components/safeArea/screen";

export default function CategoryLessons() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  return(
    <Screen edges={["top"]}>
    <LessonScreen
      categoryId={Number(categoryId)}
      onLessonPress={(id)=>(
        router.push(`/(app)/lesson/dialogues/${id}`)
      )}
    />
    </Screen>
  )
}