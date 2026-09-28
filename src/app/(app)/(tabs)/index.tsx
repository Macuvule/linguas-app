import { router } from "expo-router";
import HomeScreen from "@/features/home/home-screen";
import { Screen } from "@/components/safeArea/screen";

export default function Home() {
  return (
    <Screen edges={["top"]}>
      <HomeScreen
        onCategoryPress={(id) => {
          router.push(`/(app)/lesson/${id}`)
        }}
      />
    </Screen>
  );
}