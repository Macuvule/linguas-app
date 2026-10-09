import db from "../db";

export type Category = {
  id: number;
  language_id: number;
  title: string;
  description: string | null;
  level: string;
  image: string;
};

export function getCategoriesByLanguage(
  languageId: number
): Category[] {
  return db.getAllSync<Category>(
    `
      SELECT
        id,
        language_id,
        title,
        description,
        level,
        image
      FROM categories
      WHERE language_id = ?
      ORDER BY id;
    `,
    languageId
  );
}