import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import DialogueCard from "./components/dialogue-card";
import HomeHeader from "./components/home-header";
import LevelFilter from "./components/level-filter";
import SearchBar from "./components/search-bar";
import SlideButton from "./components/slide-button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useLanguages } from "./useLanguages";

import {
  Category,
  getCategoriesByLanguage,
} from "@/database/repositories/categoryRepository";

import { Text } from "@/components/ui";

type Props = {
  languageId: number;
  onCategoryPress?: (categoryId: number) => void;
  onLanguageChange: (languageId: number) => void;
};

export default function HomeScreen({
  languageId,
  onLanguageChange,
  onCategoryPress,
}: Props) {
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadedLanguageId, setLoadedLanguageId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { languages, loading: loadingLanguages } = useLanguages();

  // loading derivado: os dados em ecrã não são do idioma selecionado
  const loading = loadingLanguages || loadedLanguageId !== languageId;

  useEffect(() => {
    if (
      languages.length > 0 &&
      !languages.some((language) => language.id === languageId)
    ) {
      onLanguageChange(languages[0].id);
    }
  }, [languages, languageId, onLanguageChange]);

  useEffect(() => {
    let isMounted = true;
    setError(null);

    // dá tempo ao React Native de desenhar o spinner antes da query síncrona
    const timer = setTimeout(() => {
      try {
        const data = getCategoriesByLanguage(languageId);
        if (isMounted) setCategories(data);
      } catch (err) {
        if (isMounted) {
          setCategories([]);
          setError("Não foi possível carregar as categorias.");
        }
      } finally {
        if (isMounted) setLoadedLanguageId(languageId);
      }
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [languageId]);

  const filteredCategories = categories.filter((category) => {
    const matchesLevel =
      selectedLevel === "Todos" ||
      category.level === selectedLevel;

    const matchesSearch = category.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesLevel && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.languageSection}>
          <SlideButton
            options={languages}
            selectedId={languageId}
            onChange={onLanguageChange}
          />
        </View>

        <View style={styles.searchSection}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <LevelFilter
          selectedLevel={selectedLevel}
          onChange={setSelectedLevel}
        />

        {(loading || loadingLanguages) && (
          <LoadingSpinner message="A carregar..." />
        )}

        {!loading && error && (
          <View style={styles.emptyState}>
            <Text>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.dialogueList}>
            {filteredCategories.map((category) => (
              <DialogueCard
                key={category.id}
                {...category}
                handlePress={() =>
                  onCategoryPress?.(category.id)
                }
                image={category.image}
                level={category.level}
                description={
                  category.description ??
                  "Sem descrição disponível"
                }
              />
            ))}
          </View>
        )}

        {!loading &&
          !error &&
          filteredCategories.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyCircle} />
              <View style={styles.emptyInfo} />
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

  emptyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#edf0df",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyInfo: {
    marginTop: 16,
  },

  languageSection: {
  gap: 10,
  },

  languageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#456800",
  },
});