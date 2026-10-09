import { getLanguages } from "@/database/repositories/languageRepository";
import { useEffect, useState } from "react";
import type { LanguageOption } from "./components/slide-button";

export function useLanguages() {
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = getLanguages();

      setLanguages(
        data.map((language) => ({
          id: language.id,
          label: language.name,
        }))
      );
    } catch {
      setLanguages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { languages, loading };
}