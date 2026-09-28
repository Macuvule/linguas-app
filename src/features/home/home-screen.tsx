import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import HomeHeader from "./components/home-header";
import SearchBar from "./components/search-bar";
import LevelFilter from "./components/level-filter";
import DialogueCard from "./components/dialogue-card";
import { getCategories, Category } from "@/database/repositories/categoryRepository";
import { number } from "zod";
import { Text } from '@/components/ui';


type Props = {
  onCategoryPress?: (categoryId: number) => void;
};

export default function HomeScreen({ onCategoryPress }: Props) {

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)


  useEffect(()=>{
    let isMounted = true;

    async function loadCategories() {
      try{
        setLoading(true);
        const data = await getCategories();
        if (isMounted) { setCategories(data); }
      } catch (err) {
        if (isMounted) setError("Não foi possível carregar as categorias.")
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = categories.filter((category)=>{
    const matchesLevel = 
      selectedLevel === "Todos" ||
      category.level === selectedLevel;
    
    const matchesSearch = category.title
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesLevel && matchesSearch;
  })

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchSection}>
          <View>
            <View>
              <SearchBar value={search} onChangeText={setSearch} />
            </View>
          </View>
        </View>

        <LevelFilter
          selectedLevel={selectedLevel}
          onChange={setSelectedLevel}
        />
        {!loading && error && (
          <View style={styles.emptyState}>
            <Text>{error}</Text>
          </View>
        )}

        {!loading && !error &&(
          <View style={styles.dialogueList}>
            {filteredCategories.map((category) => (
              <DialogueCard key={category.id} {...category} 
              handlePress={() => onCategoryPress?.(category.id)} 
              image={category.image} level={category.level} description={category.description ?? "sem descricao disponivel" } />
            ))}
          </View>
        )}

        {!loading && !error && filteredCategories.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyCircle} />
              <View style={styles.emptyInfo}>
                {/* Empty state / informação */}
              </View>
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
});