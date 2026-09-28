import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="lesson/[categoryId]" />
      <Stack.Screen name="lesson/dialogues/[lessonId]" />
    </Stack>
  );
}