import db from "../db";

export type Lesson = {
  id: number;
  category_id: number;
  title: string;
  description: string | null;
  image: string;
};

export function getLessonsByCategory(
  categoryId: number
): Lesson[] {
  return db.getAllSync<Lesson>(
    `
      SELECT
        id,
        category_id,
        title,
        description,
        image
      FROM lessons
      WHERE category_id = ?
      ORDER BY id;
    `,
    categoryId
  );
}