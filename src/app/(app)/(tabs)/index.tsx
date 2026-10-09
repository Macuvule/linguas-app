import { router } from "expo-router";
import { useState } from "react";

import { Screen } from "@/components/safeArea/screen";
import HomeScreen from "@/features/home/home-screen";

import {
  DEFAULT_LANGUAGE_ID,
  LANGUAGE_STORAGE_KEY,
} from "@/features/home/languages";
import { getItem, setItem } from "@/lib/storage";

export default function Home() {
  const [languageId, setLanguageId] = useState<number>(() => {
    return (
      getItem<number>(LANGUAGE_STORAGE_KEY) ??
      DEFAULT_LANGUAGE_ID
    );
  });

  function handleLanguageChange(id: number) {
    setLanguageId(id);
    void setItem(LANGUAGE_STORAGE_KEY, id);
  }

  return (
    <Screen edges={["top"]}>
      <HomeScreen
        languageId={languageId}
        onLanguageChange={handleLanguageChange}
        onCategoryPress={(id) => {
          router.push(`/(app)/lesson/${id}`);
        }}
      />
    </Screen>
  );
}