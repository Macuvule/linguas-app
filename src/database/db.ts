import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("english_app.db");

export function initializeDatabase() {
    db.execSync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE,
            description TEXT,
            level TEXT,
            image TEXT
        );

        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            image TEXT,
            order_index INTEGER NOT NULL DEFAULT 0,
            UNIQUE (category_id, title),


            FOREIGN KEY (category_id)
                REFERENCES categories(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS dialogues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lesson_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            audio_group TEXT,

            UNIQUE(lesson_id, title),

            FOREIGN KEY (lesson_id)
                REFERENCES lessons(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS dialogue_lines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dialogue_id INTEGER NOT NULL,
            speaker TEXT NOT NULL,
            english TEXT NOT NULL,
            translation TEXT,
            audio_key INTEGER,
            order_index INTEGER NOT NULL DEFAULT 0,
            UNIQUE(dialogue_id, order_index),

            FOREIGN KEY (dialogue_id)
                REFERENCES dialogues(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS user_recordings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              dialogue_line_id INTEGER NOT NULL UNIQUE,
              audio_path TEXT NOT NULL,
              created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

              FOREIGN KEY (dialogue_line_id)
                  REFERENCES dialogue_lines(id)
                  ON DELETE CASCADE
          );
      
    `)

    console.log("base de dados inicializado");
}

export function resetDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = OFF;

    DROP TABLE IF EXISTS dialogue_lines;
    DROP TABLE IF EXISTS dialogues;
    DROP TABLE IF EXISTS lessons;
    DROP TABLE IF EXISTS categories;

    PRAGMA foreign_keys = ON;
  `);

  console.log("Banco de dados apagado.");
}

export function insertCategory(
  title: string,
  description: string,
  level: string,
  image: string
) {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO categories (title, description, level, image)
      VALUES (?, ?, ?, ?);
    `,
    title,
    description,
    level,
    image
  );

  if (result.changes === 0) {
    const existing = db.getFirstSync<{ id: number }>(
      `
        SELECT id
        FROM categories
        WHERE title = ?;
      `,
      title
    );

    return existing?.id;
  }

  return result.lastInsertRowId;
}

export function insertLesson(
  categoryId: number,
  title: string,
  description: string,
  image: string,
  orderIndex: number
) {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO lessons
        (category_id, title, description, image, order_index)
      VALUES (?, ?, ?, ?, ?);
    `,
    categoryId,
    title,
    description,
    image,
    orderIndex
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM lessons
      WHERE category_id = ?
        AND title = ?;
    `,
    categoryId,
    title
  );

  return existing?.id;
}

export function insertDialogue(
  lessonId: number,
  title: string,
  audioGroup: string
) {
  const result = db.runSync(
    `
      INSERT INTO dialogues (
        lesson_id,
        title,
        audio_group
      )
      VALUES (?, ?, ?)

      ON CONFLICT(lesson_id, title)
      DO UPDATE SET
        audio_group = excluded.audio_group;
    `,
    lessonId,
    title,
    audioGroup
  );

  const dialogue = db.getFirstSync<{
    id: number;
  }>(
    `
      SELECT id
      FROM dialogues
      WHERE lesson_id = ?
      AND title = ?;
    `,
    lessonId,
    title
  );

  return dialogue?.id;
}

export function insertDialogueLine(
  dialogueId: number,
  speaker: string,
  english: string,
  translation: string,
  audioKey: number | null,
  orderIndex: number
) {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO dialogue_lines
        (
          dialogue_id,
          speaker,
          english,
          translation,
          audio_key,
          order_index
        )
      VALUES (?, ?, ?, ?, ?, ?);
    `,
    dialogueId,
    speaker,
    english,
    translation,
    audioKey,
    orderIndex
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM dialogue_lines
      WHERE dialogue_id = ?
        AND order_index = ?;
    `,
    dialogueId,
    orderIndex
  );

  return existing?.id;
}

export default db;