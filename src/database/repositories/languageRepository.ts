import db from "../db";

export type Language = {
  id: number;
  name: string;
  code: string;
};

export function getLanguages(): Language[] {
  return db.getAllSync<Language>(
    `
      SELECT
        id,
        name,
        code
      FROM languages
      ORDER BY id;
    `
  );
}

export function getLanguageById(id: number): Language | null {
  const language = db.getFirstSync<Language>(
    `
      SELECT
        id,
        name,
        code
      FROM languages
      WHERE id = ?
      LIMIT 1;
    `,
    id
  );

  return language ?? null;
}

export function getLanguageByCode(code: string): Language | null {
  const language = db.getFirstSync<Language>(
    `
      SELECT
        id,
        name,
        code
      FROM languages
      WHERE code = ?
      LIMIT 1;
    `,
    code
  );

  return language ?? null;
}