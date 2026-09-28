import db from "../db";

export type Category = {
  id: number;
  title: string;
  description: string | null;
  level: string;
  image: string;
};

export function getCategories(): Category[] {
  return db.getAllSync<Category>(
    `
      SELECT
        id,
        title,
        description,
        level,
        image
      FROM categories
      ORDER BY id;
    `
  );
}